const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

/**
 * Generates a SHA-1 signature for Cloudinary signed uploads.
 * @param {string} string - The string to hash.
 * @returns {Promise<string>} - The SHA-1 hash.
 */
async function sha1(string) {
  const buffer = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Uploads an image file to Cloudinary using a SIGNED request.
 * This avoids the need for an unsigned upload preset.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
export const uploadImage = async (file) => {
  if (!file) return null;

  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'denyx_uploads'; // Specified folder as requested
  
  // Cloudinary signature requirements: 
  // Parameters must be sorted alphabetically
  const signatureString = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = await sha1(signatureString);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('folder', folder);
  formData.append('signature', signature);
  
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary Error Detail:', errorData);
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};

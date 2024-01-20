import { EnvironmentVariable } from '@communalapp/common/env';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUploadClient = createClientComponentClient();

export const uploadCommunityLogo = async (
  event: React.ChangeEvent<HTMLInputElement>,
): Promise<string> => {
  const file = event.target.files && event.target.files[0];
  const bucket = 'images';

  // Call Storage API to upload file
  const { data, error } = await supabaseUploadClient.storage
    .from(bucket)
    .upload(file?.name as string, file as Blob);

  // Handle error if upload failed
  if (error) {
    console.error('Error uploading file.');
  }

  return (EnvironmentVariable.Supabase.storage +
    '/images/' +
    data?.path) as string;
};

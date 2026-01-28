'use server';

import { getStore } from '@netlify/blobs';
import { uploadDisabled } from 'utils';
import { revalidatePath } from 'next/cache';

export async function uploadFile(formData) {
    if (uploadDisabled) {
        throw new Error('Uploads are disabled');
    }

    const file = formData.get('file');
    if (!file || file.size === 0) {
        throw new Error('No valid file provided');
    }

    const store = getStore({ name: 'uploads', consistency: 'strong' });
    const arrayBuffer = await file.arrayBuffer();
    await store.set(file.name, Buffer.from(arrayBuffer));
    
    revalidatePath('/upload');
    return { success: true };
}

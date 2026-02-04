'use client';

import { useState } from 'react';
import { uploadFile } from './actions';

export function UploadForm() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(formData) {
        setStatus('uploading');
        setMessage('');
        try {
            await uploadFile(formData);
            setStatus('success');
            setMessage('Archivo subido correctamente!');
        } catch (e) {
            setStatus('error');
            setMessage(e.message);
        }
    }

    return (
        <div className="w-full max-w-md">
            <form action={handleSubmit} className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-lg text-neutral-900">
                <div className="flex flex-col gap-2">
                    <label htmlFor="file-upload" className="font-medium text-gray-700">
                        Seleccionar archivo
                    </label>
                    <input 
                        id="file-upload"
                        type="file" 
                        name="file" 
                        required
                        className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            cursor-pointer"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={status === 'uploading'}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'uploading' ? 'Subiendo...' : 'Subir Archivo'}
                </button>
                
                {message && (
                    <div className={`p-3 rounded text-sm text-center ${status === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

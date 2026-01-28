import { UploadForm } from './form';

export const metadata = {
    title: 'Usuario',
};

export default function UploadPage() {
    return (
        <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Subir Archivos</h1>
                <p className="text-lg text-blue-100">Sube tus archivos de forma segura a Netlify Blobs</p>
            </div>
            <UploadForm />
        </section>
    );
}

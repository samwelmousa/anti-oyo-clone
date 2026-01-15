import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
                <p className="mb-6 text-gray-600">
                    Your OYO adventure awaits. A confirmation email has been sent to you.
                </p>
                <Link
                    href="/"
                    className="inline-block w-full rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

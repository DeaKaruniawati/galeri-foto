import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/3eea5139-bd17-47f4-a49b-18b11ee5684f.jpg')" }}>
                <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
                    <div className="bg-gray p-10 rounded-lg w-96 max-w-full">
                        <h2 className="text-2xl font-bold text-center mb-6 text-black">Website Galeri Foto</h2>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Log In</h3>
                        </div>

                        <form onSubmit={submit}>
                            {/* Email Input */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-white" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full p-3 rounded-md border border-white-300"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password Input */}
                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" className="text-white" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full p-3 rounded-md border border-white-300"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                    />
                                    <span className="ms-2 text-sm text-white">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 flex items-center justify-center">
                                <PrimaryButton className="w-full text-center py-3 justify-center" disabled={processing}>
                                    Log in
                                </PrimaryButton>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="mt-4 ">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-red-600 hover:text-blue-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            {/* Register Link */}
                            <div className="mt-4">
                                <Link
                                    href={route('register')}
                                    className="text-sm text-red-600 hover:text-blue-800"
                                >
                                    Don't have an account? Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

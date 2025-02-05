import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/3eea5139-bd17-47f4-a49b-18b11ee5684f.jpg')" }}>
                <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
                    <div className="bg-gray p-10 rounded-lg w-96 max-w-full">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#67BACA]">Website Galeri Foto</h2>


                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Sign Up</h3>
                        </div>


                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" className="text-white" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full p-3 rounded-md border border-white-300"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" className="text-white" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full p-3 rounded-md border border-white-300"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" className="text-white" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full p-3 rounded-md border border-gray-300"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full p-3 rounded-md border border-white-300"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="mt-6 flex items-center justify-center">
                                <PrimaryButton className="w-full text-center py-3" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>

                            <div className="mt-4 text-center">
                                <Link
                                    href={route('login')}
                                    className="text-sm text-red-600 hover:text-blue-800"
                                >
                                    Already have an account? Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

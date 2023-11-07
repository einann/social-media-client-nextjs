import Image from 'next/image'
import DummyAvatar from '../../public/dummy_avatar.png';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex flex-row items-center bg-cyan-700 px-2 py-1 text-white justify-between">
            <Link href="/" className='font-bold'>EINAN_SOCM</Link>
            <input type='text' className='rounded-md' /> {/* GEÇİCİ - Burası ayrı bir arama componenti olarak yazılacak */}
            <Link href="/user" className='flex flex-row items-center'>
                <Image 
                    src={DummyAvatar}
                    alt="Avatar"
                    width={30}
                    height={30}
                    className='border rounded-full bg-emerald-700'
                />
                <p className='ml-1'>Ebubekir İnan</p>
            </Link>
        </nav>
    )
}

// Mobilde sidebar olarak açılacak şekilde yapılacak.
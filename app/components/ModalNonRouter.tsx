"use client";

import { IoMdClose } from "react-icons/io";

import { useRef, MouseEventHandler } from "react";

type ModalProps = {
    isOpen: boolean,
    close: () => void,
    children: React.ReactNode,
}

export default function ModalNonRouter({ isOpen, close, children }: ModalProps) {
    const overlay = useRef(null);
    const wrapper = useRef(null);

    const onClickElement: MouseEventHandler = (e) => {
        if (e.target === overlay.current) {
            close();
        }
    }

    return (
        <div
            ref={overlay}
            className={`absolute w-full h-full bg-black/30 left-0 top-0 ${isOpen ? 'block' : 'hidden'}`}
            onClick={onClickElement}
        >
            <dialog
                ref={wrapper}
                open={isOpen}
                className="absolute w-1/4 top-1/2 -translate-y-1/2 bg-slate-300 rounded-md shadow-lg"
            >
                <div
                    className="h-full flex flex-col p-2"
                >
                    <div className="flex justify-end w-full border-b border-b-slate-400/50">
                        <button className="flex items-center gap-1 hover:text-pink-700" onClick={close}>
                            Close
                            <IoMdClose />
                        </button>
                    </div>
                    <div className="p-2">{children}</div>
                </div>
            </dialog>
        </div>
    )
}

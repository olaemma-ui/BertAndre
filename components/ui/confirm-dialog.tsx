"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ConfirmOptions {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "info" | "warning";
}

interface ConfirmContextType {
    confirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({});
    const [message, setMessage] = useState("");
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

    const confirm = useCallback((msg: string, opts: ConfirmOptions = {}) => {
        setMessage(msg);
        setOptions(opts);
        setIsOpen(true);
        return new Promise<boolean>((resolve) => {
            setResolvePromise(() => resolve);
        });
    }, []);

    const handleConfirm = () => {
        setIsOpen(false);
        if (resolvePromise) resolvePromise(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
        if (resolvePromise) resolvePromise(false);
    };

    const isDanger = options.variant === "danger" || options.variant === undefined; // Default to danger for delete actions

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCancel}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full ${isDanger ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {options.title || "Are you sure?"}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {message}
                                        </p>
                                    </div>
                                    <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex justify-end gap-3 mt-8">
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                                    >
                                        {options.cancelText || "Cancel"}
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${isDanger
                                            ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20'
                                            : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                                            }`}
                                    >
                                        {options.confirmText || "Confirm"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
}

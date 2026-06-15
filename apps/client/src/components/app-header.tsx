
export function AppHeader({children}: {children: React.ReactNode}) {
    return (
        <div className="flex justify-between p-4">
            {children}
             <header>
                <div className="ml-2 text-lg italic font-extrabold cursor-pointer">
                    Talksy
                </div>
            </header>
        </div>
    )
}
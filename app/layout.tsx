import "./globals.css";

export const metadata = {
    title: "Ohana Recovery @ Night",
    description: "A serene waiting room for the Ohana Recovery night meeting.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}

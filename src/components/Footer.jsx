// footer
// Simple footer with app description and copyright
export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-auto ">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          HiddenPixels - A modern steganography tool for secure message encoding<br />
          © {new Date().getFullYear()} IR5H4D. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


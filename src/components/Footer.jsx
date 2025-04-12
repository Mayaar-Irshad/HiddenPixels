// footer
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          HiddenPixels - A modern steganography tool for secure message encoding<br />
          © {new Date().getFullYear()} Ahmad Irshad Mayaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

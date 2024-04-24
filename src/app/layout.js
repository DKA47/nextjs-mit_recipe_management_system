import '../app/globals.css';
import { inter, lusitana } from '../app/fonts';
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}   
      </body>
    </html>
  );
};
export default RootLayout;

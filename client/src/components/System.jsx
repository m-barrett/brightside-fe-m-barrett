import logoNameWhite from '../assets/logoNameWhite.svg';
import logoNameBlue from '../assets/logoNameBlue.svg';

export const LogoName = ({ variant }) => <img src={variant === 'white' ? logoNameWhite : logoNameBlue} className='h-6 w-auto sm:h-8 sm:mt-2' alt="logoName" />;
export const Body = ({ children }) => <p className="text-md">{children}</p>
export const Title1 = ({ children }) => <h1 className='text-4xl mb-4'>{children}</h1>
export const Title2 = ({ children }) => <h2 className='text-2xl mb-4'>{children}</h2>

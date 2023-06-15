import { AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './Button.module.css';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

export interface ButtonProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    AriaAttributes {
  buttonType?: ButtonType;
  children: string | JSX.Element;
}

export const Button = ({
  children,
  buttonType = ButtonType.Primary,
  type = 'button',
  ...buttonProps
}: ButtonProps) => {
  const typeClass =
    buttonType === ButtonType.Primary ? styles.primary : styles.secondary;

  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${typeClass}`}
      type={type}
    >
      {children}
    </button>
  );
};

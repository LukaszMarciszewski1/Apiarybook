import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number';
  placeholder: string
  disabled?: boolean
  onChange?: (value: any) => void
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type,
      placeholder,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
        {...props}
      />
    )
  }
)

export default Input











// import React, { forwardRef } from 'react'
// import styles from './styles.module.scss'

// export type InputProps = {
//   id: string;
//   name: string;
//   label: string;
//   type?: 'text' | 'email' | 'number';
//   placeholder: string
// }

// const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       id,
//       name,
//       label,
//       type,
//       placeholder,
//       ...props
//     },
//     ref
//   ) => {
//     return (
//       <input
//         id={id}
//         ref={ref}
//         name={name}
//         type={type}
//         aria-label={label}
//         placeholder={placeholder}
//         className={styles.input}
//         {...props}
//       />
//     )
//   }
// )

// export default Input
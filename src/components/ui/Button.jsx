export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', type = 'button' }) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary:  'bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500',
    secondary:'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 focus:ring-gray-300',
    danger:   'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost:    'text-violet-600 hover:bg-violet-50 focus:ring-violet-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

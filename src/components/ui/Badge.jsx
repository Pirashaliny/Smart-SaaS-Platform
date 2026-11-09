export default function Badge({ status }) {
  const styles = {
    active:    'bg-green-100 text-green-700',
    inactive:  'bg-gray-100 text-gray-600',
    pending:   'bg-yellow-100 text-yellow-700',
    suspended: 'bg-red-100 text-red-700',
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[status] || styles.inactive}`}>
      {status}
    </span>
  )
}

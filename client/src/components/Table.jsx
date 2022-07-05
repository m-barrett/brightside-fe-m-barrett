const Table = ({ children, className }) => <div className={`relative overflow-x-auto shadow-sm sm:rounded-sm bg-white ${className}`}><table className='w-full'>{children}</table></div>;
Table.Body = ({ children, className }) => <tbody className={className}>{children}</tbody>
Table.DataItem = ({ children }) => {
  return <td className='px-6 py-4 font-medium whitespace-nowrap'>{children}</td>
}
Table.BoldDataItem = ({ children }) => {
  return <td className='px-6 py-4 capitalize font-bold font-medium whitespace-nowrap'>{children}</td>
}
Table.HeadItem = ({ children }) => {
  return <td className='px-6 py-3'>{children}</td>
}
Table.Head = ({ children }) => {
  return <thead className="uppercase bg-gray-300 border-b border-gray-300">
    <tr>
      {children}
    </tr>
  </thead>
}
Table.Row = ({ children, className, onClick }) => <tr className={`hover:bg-gray-300 ${className}`} onClick={onClick}>{children}</tr>;
export default Table;

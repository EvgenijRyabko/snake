import './Cell.css'

export const Cell = ({ id }: {id: string}) => {
  return (
    <div id={id} className='cell' />
  )
}
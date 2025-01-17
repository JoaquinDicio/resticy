import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ButtonLink = ({link, text, width}) => {
  return (
    <>
    <Link to={link} className={`rounded bg-[--yellow-color] py-2 mt-10 font-medium ${width || ""} hover:transition-all hover:bg-[--yellow-secondary]`}>
                {text}
    </Link>
    </>
  )
}

export default ButtonLink
3
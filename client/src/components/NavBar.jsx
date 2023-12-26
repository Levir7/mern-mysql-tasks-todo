import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="bg-zinc-800 flex justify-between px-20 py-5">
        <Link to="/" className="text-white font-bold">
          <h1>React MYSQL</h1>
        </Link>
        <ul className="flex gap-x-2">
            <li>
                <Link to='/' className="bg-slate-200 px-2 py-1">Home</Link>
            </li>
            <li>
                <Link to='/new' className="bg-teal-200 py-1 px-2">Create Task</Link>
            </li>
        </ul>
    </div>
  )
}

export default NavBar
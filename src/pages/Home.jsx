import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";



export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1 className="text-success"> Contact list using React & Context <JC-->©</JC-->!!!</h1>
			<Link className='btn btn-primary' to={'/contact/'}>CLick Here</Link>
			<p className="mt-5">
				<img src={rigoImageUrl} />
			</p>

		</div>
	);
}; 
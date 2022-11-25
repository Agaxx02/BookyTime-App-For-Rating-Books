import React, { useState } from 'react';
import { CredentialsContext } from '../App';
import { useContext } from 'react';
import { changeUserInfo } from '../api/changeUserInfo';

function ChangeProfilePicture(props) {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [currentPicture, setCurrentPicture] = useState(
		'https://i.ibb.co/D4j9KrG/znak-zapytania2.jpg'
	);

	return (
		<div className='popup'>
			<div className='popup-innner'>
				{props.target === 'picture' ? (
					<section className='profilePictures'>
						<img
							src='https://i.ibb.co/0GPM92t/bear.jpg'
							alt='bear'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/0GPM92t/bear.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/PNqb2St/cat-jpg.jpg'
							alt='cat'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/PNqb2St/cat-jpg.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/nCMX39m/man-1.jpg'
							alt='man-1'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/nCMX39m/man-1.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/rsqmhx4/man-2.jpg'
							alt='man-2'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/rsqmhx4/man-2.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/RpYM5PP/man-3.jpg'
							alt='man-3'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/RpYM5PP/man-3.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/H7GtF5b/man.jpg'
							alt='man'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture('https://i.ibb.co/H7GtF5b/man.jpg');
							}}
						/>
						<img
							src='https://i.ibb.co/9rm12f4/profile.jpg'
							alt='profile'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/9rm12f4/profile.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/WgRf7m0/user.jpg'
							alt='user'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/WgRf7m0/user.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/4J7v2R1/woman.jpg'
							alt='woman'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/4J7v2R1/woman.jpg'
								);
							}}
						/>
						<img
							src='https://i.ibb.co/D4j9KrG/znak-zapytania2.jpg'
							alt='man-1'
							className='profilePicture'
							onClick={(e) => {
								e.preventDefault();
								setCurrentPicture(
									'https://i.ibb.co/D4j9KrG/znak-zapytania2.jpg'
								);
							}}
						/>
					</section>
				) : (
					''
				)}
				{props.target === 'goal' ? 'goal' : ''}
				{props.target === 'username' ? 'username' : ''}
				<button
					className='smallerButton '
					onClick={() => {
						changeUserInfo(
							credentials,
							props.target,
							currentPicture,
							setCredentials
						);
						props.closePopup(false);
					}}
				>
					Save
				</button>
				<button
					className='smallerButton '
					onClick={() => {
						props.closePopup(false);
					}}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default ChangeProfilePicture;

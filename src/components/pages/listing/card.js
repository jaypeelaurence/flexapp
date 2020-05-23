import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = (props) => {
	const [img, setImage] = useState('./img');

	useEffect(() => {
		const initialImage = (bool) => !bool ? null : setImage(require('./img/' + props.thumb));

		initialImage(true);

		return () => initialImage(false);
	})

	return (
		<article className={"card"}>
			<div className={"img"}>
				<LazyLoadImage
					src={img}
					effect={"black-and-white"}
					alt={`${props.title} - ${props.tag}`}
					height={img.height}
					width={img.width}
				/>
				<div className={"tag"}>
					<h3>{props.tag}</h3>
					<div className={"placer"} />
				</div>
			</div>
			<div className={"content"}>
				<h1 className={"title"}>{props.title_long}</h1>
				<Link to={`/page/${props.slug}`}>
					<svg id="Colour_Neutral_2._Darker_Grey" data-name="Colour/Neutral/2. Darker Grey" xmlns="http://www.w3.org/2000/svg" width="32" height="4" viewBox="0 0 32 2">
					  	<rect id="Colour_Neutral_2._Darker_Grey_background" data-name="Colour/Neutral/2. Darker Grey background" width="32" height="4" fill="rgba(0,0,0,0)"/>
					  	<rect id="Colour_Neutral_1._Black" data-name="Colour/Neutral/1. Black" width="32" height="4" fill="#3852f7"/>
					</svg>
					View Case Study
				</Link>
			</div>
		</article>
	)
}

export default Card;
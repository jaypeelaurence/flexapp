import React, { useState, useEffect } from 'react';

import { Helmet } from "react-helmet";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Content = props => {
	const [img, setImage] = useState('./img');
	const [data, setData] = useState({
		value: null,
		state: null,
		prevState: null
	});

	const formatDate = props => {
		const date = new Date(props);

		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}

	const loadImage = async () => await setImage(require('./img/' + props.image)); // simulates fetching image from props;

	const loadProps = async () => data.value ? null : setData({...data, value: props});  // simulates fetching data from props;

	const loadData = () => Promise.all([loadImage(), loadProps()]);

	const sort = (state = null) => setData({
		value: {
			...data.value,
			questions: data.value.questions.map((questions, key) => ({
				...questions,
				date: new Date(questions.date).getTime()
			})).sort((a, b) =>{
				let sort = b.date + a.date;

				if(!data.state){
					sort = b.date - a.date;
				}

				return sort;
			})
		},
		state: state ? data.state : data.state ? 0 : 1,
		prevState: data.state
	})

	useEffect(() => {
		loadData();

		return () => ((loadData()));
	})

	return (
		!data.value ? null : 
		<article className={"cardContent"}>
			<Helmet title={`ADRENALIN - ${data.value.title}`} />
			<div className={"row"}>
				<div className={["col-md-6", "custCol"].join(" ")}>
					<div className={"img"}>
						<LazyLoadImage src={img} effect={"black-and-white"} alt={`${data.value.title} - ${data.value.tag}`} height={img.height} width={img.width} placeholder={null} />
						<div className={"tag"}>
							<h3>{data.value.tag}</h3>
							<div className={"placer"} />
						</div>
					</div>
				</div>
				<div className={["col-md-6", "custCol"].join(" ")}>
					<div className={"content"}>
						<h1 className={"title"}>{data.value.title}</h1>
						<button onClick={() => sort()} className={"sort"}>
							SORT BY {data.state ? "Oldest" : "Latest"}
							<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12.992" viewBox="0 0 13 12.992">
								<g id="single-neutral-actions-refresh" transform="translate(0 -0.003)">
									<path id="Path" d="M12.391,2.148A1,1,0,1,0,10.5,1.5,4.091,4.091,0,0,1,3.581,2.919a.25.25,0,0,1,.008-.345L5.311.853A.5.5,0,0,0,4.957,0H.5A.5.5,0,0,0,0,.5V4.957a.5.5,0,0,0,.854.353l.969-.969a.249.249,0,0,1,.359,0,6.085,6.085,0,0,0,10.209-2.2Z" transform="translate(0 6.723)" fill="#3852f7"/>
									<path id="Path-2" data-name="Path" d="M12.491,1.231a.5.5,0,0,0-.854-.353L10.612,1.9a.249.249,0,0,1-.358,0A6.1,6.1,0,0,0,.054,4.13a1,1,0,1,0,1.893.648,4.092,4.092,0,0,1,6.9-1.445.251.251,0,0,1-.007.347L7.18,5.339a.5.5,0,0,0,.354.853h4.457a.5.5,0,0,0,.5-.5Z" transform="translate(0.509 0.003)" fill="#3852f7"/>
								</g>
							</svg>
						</button>
						<section className={"questions"}>
							{
								data.value.questions.map((data, key) => 
									<div key={key}>
										<h1>
											Question {data.index}
										</h1>
										<h3>
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="4" viewBox="0 0 32 2">
											<rect id="Dash" width="32" height="4" fill="#a4a4a4"/>
										</svg>
											{formatDate(data.date)}
										</h3>
										<p>
											{data.text}
										</p>
									</div>
								)
							}
						</section>
					</div>
				</div>
			</div>
		</article>
	)
}

export default Content;


				
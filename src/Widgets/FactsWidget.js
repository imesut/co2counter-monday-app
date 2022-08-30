import React from "react";
import "monday-ui-react-core/dist/main.css"

import disney from '../img/widget/disney.jpg';
import google from '../img/widget/google.jpg';
import ikea from '../img/widget/ikea.jpg';
import microsoft from '../img/widget/microsoft.jpg';
import pg from '../img/widget/pg.jpg';
import plastics from '../img/widget/plastics.jpg';
import water from '../img/widget/water.jpg';


class FactsWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let baseContext = this.props.baseContext;

        let facts = [
            { image: water, fact: "In the UK, we require 4,645 litres of water per person every day, resulting in 3.68 million tonnes of CO2 per year from the supply and treatment of our water." },
            { image: water, fact: "Between 1850 and 2019, we all humans emitted 2,390 Billion metric tons of carbon. We have emmited 36 billion metric tons of carbon in just one year. As companies and individuals, we are forced to take action to stay below 1.5C." },
            { image: plastics, fact: "The plastics manufacturing industry accounts for 6% of oil use and will account for 20% by 2050" },
            { image: plastics, fact: "You can directly reduce carbon emissions by reducing the use of plastic in your own and company life." },
            { image: google, fact: "Google commits to working with renewable energy 7/24 by 2030" },
            { image: microsoft, fact: "By 2050, Microsoft promises to become a completely carbon 0 company by neutralizing the carbon emissions of previous years." },
            { image: pg, fact: "P&G chief sustainability officer Virginie Helias said, `Our path towards Net 0 is not very clear, but we will not let this uncertainty stop us and we will start our work.' You too can take action to reduce carbon emissions." },
            { image: disney, fact: "Disney stopped using single-use plastics and saved 175M straws and 13M mixers every year in its parks. How much do you use single-use plastics in your company? By reducing it, you can contribute to being more sustainable." },
            { image: ikea, fact: "Ikea will be climate positive by 2030. will recycle more carbon emissions than it burns. You can also explore carbon neutralization methods for your company." },
        ]

        let randomItem = facts[Math.floor(Math.random() * facts.length)];

        return <div style={{ minWidth: 200, margin: 10, padding: 10, border: "solid 0.5px", borderRadius: 12, borderColor: "#707070" }}>
            <img src={randomItem.image} style={{borderRadius: 2, width: "100%", height: "auto"}} />
            <p style={{ fontSize: 14 }}>{randomItem.fact}</p>
        </div>

    }
}

export default FactsWidget;

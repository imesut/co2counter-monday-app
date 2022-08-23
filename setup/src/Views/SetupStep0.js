import React from "react";
import { Flex, Heading, Button, Dropdown } from "monday-ui-react-core"

import SplitedDivider from "../Components/SplitedDivider"
import {tablesForExpenseRecords} from "./../Models/StaticLists";


export default class SetupStep0 extends React.Component {

    render(){
        return(
            <Flex justify={Flex.justify.START} direction={Flex.directions.COLUMN}>
                <Heading type={Heading.types.h2} size="small" value="Create Prebuilt Schema" />
                <Button onClick={()=>{}}> Create</Button>

            <SplitedDivider text="or Customize" />

                <Heading type={Heading.types.h3} size="small" value="First, Choose Expense" />
                <p>Choose a Table which contains your expense records.</p>
                <Dropdown
                    className="dropdown-stories-styles_spacing carbon-dropdown"
                    onChange={()=>{}}
                    onClear={()=>{}}
                    onInputChange={()=>{}}
                    onOptionRemove={()=>{}}
                    onOptionSelect={()=>{}}
                    options={tablesForExpenseRecords}
                    placeholder="Placeholder text here"
                />

                <Heading type={Heading.types.h3} size="small" value="Then, Pick your Carbon Calculator" />
                <p>Choose a Table to calculate your expenses' carbon footprint.</p>
                <Dropdown
                    className="dropdown-stories-styles_spacing carbon-dropdown"
                    onChange={()=>{}}
                    onClear={()=>{}}
                    onInputChange={()=>{}}
                    onOptionRemove={()=>{}}
                    onOptionSelect={()=>{}}
                    options={tablesForExpenseRecords}
                    placeholder="Placeholder text here"
                />
            </Flex>
        )
    }
}
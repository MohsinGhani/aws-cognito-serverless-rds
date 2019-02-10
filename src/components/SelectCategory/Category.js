import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const Category = ({ title, img }) => {
    return (
        <Card className={'c-p text-center'}>
            <div>
                <img alt={title} src={img} height={100} width={100}/>
            </div>
            {title}
        </Card>
    )
};

export default withStyles({})(Category);
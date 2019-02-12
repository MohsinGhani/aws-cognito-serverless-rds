import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const Category = ({ category, selectCategory }) => {
    const { title } = category
    return (
        <Card className={'c-p text-center'} onClick={() => selectCategory(category)}>
            <div>
                <img alt={title} src={require('./../../assets/img/c15.jpg')} height={100} width={100} />
            </div>
            {title}
        </Card>
    )
};

export default withStyles({})(Category);
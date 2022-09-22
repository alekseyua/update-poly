import React from "react";
import SpinnerWrapper from "../../Views/SpinnerWrapper";
import Spinner from "../../Views/SpinnerWrapper/Spinner";

const LoadingPage = ({...props}) => {

    return (
            <SpinnerWrapper>
                <Spinner />
            </SpinnerWrapper>
    )
}

export default LoadingPage;
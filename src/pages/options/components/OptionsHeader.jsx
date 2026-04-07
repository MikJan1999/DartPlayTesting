import React from "react";
import { DefaultGeneralHeader } from "../../../components/headers/GeneralHeader";

export default function OptionsHeader() {
    return (
        <DefaultGeneralHeader
            text={"Konfiguracja uczestników"}
            animation={true}
        ></DefaultGeneralHeader>
    );
}

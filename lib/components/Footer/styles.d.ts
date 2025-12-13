declare const styles: {
    container: {
        flexDirection: "row";
        paddingBottom: number;
        alignItems: "center";
    };
    input: {
        flex: number;
        paddingVertical: number;
        paddingHorizontal: number;
        color: string;
        height: number;
        fontSize: number;
    };
    sendIcon: {
        width: number;
        height: number;
        marginRight: number;
        tintColor: string;
    };
    sendText: {
        color: string;
        paddingRight: number;
        fontSize: number;
    };
    sectionStyle: {
        flexDirection: "row";
        borderWidth: number;
        borderColor: string;
        borderRadius: number;
        flex: number;
        justifyContent: "center";
        alignItems: "center";
        marginHorizontal: number;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    ImageStyle: {
        padding: number;
        margin: number;
        height: number;
        width: number;
        resizeMode: "stretch";
        alignItems: "center";
    };
};
export default styles;

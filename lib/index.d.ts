export declare type URI = string;
export declare type NavigationTarget = string;
export declare class DynamicContentItem {
    readonly itemType: ItemType;
    constructor(itemType: ItemType);
}
export interface Metadata {
    [key: string]: number | string | boolean;
}
export declare enum ItemType {
    MessageThread = "MessageThread",
    TextMessage = "TextMessage",
    ImageMessage = "ImageMessage",
    FileMessage = "FileMessage",
    ListMessage = "ListMessage",
    CarouselMessage = "CarouselMessage",
    MessageCard = "MessageCard",
    LinkButton = "LinkButton",
    WebviewButton = "WebviewButton",
    PostbackButton = "PostbackButton",
    MultipleChoiceItem = "MultipleChoiceItem",
    ActionSequence = "ActionSequence",
    SetSlotsAction = "SetSlotsAction",
    ClearSlotsAction = "ClearSlotsAction",
    AnalyticsEventAction = "AnalyticsEventAction",
    Navigation = "Navigation",
}
export declare type DynamicFlowElement = MessageThread | Navigation | ActionSequence;
export declare class Navigation extends DynamicContentItem {
    continueTo: NavigationTarget;
    constructor();
}
export declare class ActionSequence extends DynamicContentItem {
    actions: Action[];
    constructor();
}
export declare type Action = SetSlotsAction | ClearSlotsAction | AnalyticsEventAction;
export declare type SetSlotValueType = string | number | boolean | MultipleChoiceItem[] | Date;
export interface MapOfSlotToSlotValue {
    [key: string]: SetSlotValueType;
}
export declare class SetSlotsAction extends DynamicContentItem {
    slots: MapOfSlotToSlotValue;
    constructor();
}
export declare class ClearSlotsAction extends DynamicContentItem {
    slotNames: string[];
    constructor();
}
export declare class AnalyticsEventAction extends DynamicContentItem {
    eventName: string;
    eventData?: any;
    constructor();
}
export declare class MultipleChoiceItem extends DynamicContentItem {
    displayName: string;
    value: string;
    iconUrl?: URI;
    constructor();
}
export declare class MessageThread extends DynamicContentItem {
    messages: Message[];
    constructor();
}
export declare class Message extends DynamicContentItem {
    additionalData?: any;
    constructor(type: ItemType);
}
export declare class TextMessage extends Message {
    text: string;
    constructor();
}
export declare class ImageMessage extends Message {
    text: string;
    imageUrl: URI;
    constructor();
}
export declare class FileMessage extends Message {
    text: string;
    fileUrl: URI;
    constructor();
}
export declare class ListMessage extends Message {
    items: MessageCard[];
    constructor();
}
export declare class CarouselMessage extends Message {
    items: MessageCard[];
    constructor();
}
export declare type RichMessage = ListMessage | CarouselMessage;
export declare class MessageCard extends DynamicContentItem {
    type: string;
    title: string;
    description: string;
    imageUrl?: URI;
    size?: MessageCardImageSize;
    buttons: Button[];
    constructor();
}
export declare enum MessageCardImageSize {
    Compact = "compact",
    Large = "large",
}
export declare type Button = LinkButton | WebviewButton | PostbackButton;
export declare enum ButtonType {
    Link = "link",
    Webview = "webview",
    Postback = "postback",
}
export declare class LinkButton extends DynamicContentItem {
    buttonType: ButtonType;
    text: string;
    uri: URI;
    isDefault?: boolean;
    metadata?: Metadata;
    constructor();
}
export declare class WebviewButton extends DynamicContentItem {
    buttonType: ButtonType;
    text: string;
    uri: URI;
    fallbackUri: URI;
    size: WebviewSize;
    isDefault?: boolean;
    metadata?: Metadata;
    constructor();
}
export declare enum WebviewSize {
    Compact = "compact",
    Tall = "tall",
    Full = "full",
}
export interface PostBackPayload {
    handler: string;
    data?: any;
}
export declare class PostbackButton extends DynamicContentItem {
    buttonType: ButtonType;
    text: string;
    metadata?: Metadata;
    payload: PostBackPayload;
    constructor();
}

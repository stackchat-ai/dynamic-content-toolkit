"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicContentItem = /** @class */ (function () {
    function DynamicContentItem(itemType) {
        this.itemType = itemType;
    }
    return DynamicContentItem;
}());
exports.DynamicContentItem = DynamicContentItem;
var ItemType;
(function (ItemType) {
    // Flow Elements: Message Threads
    ItemType["MessageThread"] = "MessageThread";
    ItemType["TextMessage"] = "TextMessage";
    ItemType["ImageMessage"] = "ImageMessage";
    ItemType["FileMessage"] = "FileMessage";
    ItemType["ListMessage"] = "ListMessage";
    ItemType["CarouselMessage"] = "CarouselMessage";
    ItemType["MessageCard"] = "MessageCard";
    ItemType["LinkButton"] = "LinkButton";
    ItemType["WebviewButton"] = "WebviewButton";
    ItemType["PostbackButton"] = "PostbackButton";
    // TODO: Future support
    // QuickNavGroup = 'QuickNavGroup',
    // QuickNavItem = 'QuickNavItem',
    // Flow Elements: Message Threads: User Input
    // UserInputGroup = 'UserInputGroup',
    // UserInputSlot = 'UserInputSlot',
    ItemType["MultipleChoiceItem"] = "MultipleChoiceItem";
    // Flow Elements: Action Sequences
    ItemType["ActionSequence"] = "ActionSequence";
    // FIXME: TODO: implement this
    ItemType["SetSlotsAction"] = "SetSlotsAction";
    ItemType["ClearSlotsAction"] = "ClearSlotsAction";
    ItemType["AnalyticsEventAction"] = "AnalyticsEventAction";
    ItemType["Navigation"] = "Navigation";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
//////////////////////////////////////////////////////////////////////////////////////////
// Navigation //////////////////////////////////////////////////////////////////////
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation() {
        var _this = _super.call(this, ItemType.Navigation) || this;
        _this.continueTo = '';
        return _this;
    }
    return Navigation;
}(DynamicContentItem));
exports.Navigation = Navigation;
//////////////////////////////////////////////////////////////////////////////////////////
// Action Sequences //////////////////////////////////////////////////////////////////////
var ActionSequence = /** @class */ (function (_super) {
    __extends(ActionSequence, _super);
    function ActionSequence() {
        var _this = _super.call(this, ItemType.ActionSequence) || this;
        _this.actions = [];
        return _this;
    }
    return ActionSequence;
}(DynamicContentItem));
exports.ActionSequence = ActionSequence;
var SetSlotsAction = /** @class */ (function (_super) {
    __extends(SetSlotsAction, _super);
    function SetSlotsAction() {
        var _this = _super.call(this, ItemType.SetSlotsAction) || this;
        _this.slots = {};
        return _this;
    }
    return SetSlotsAction;
}(DynamicContentItem));
exports.SetSlotsAction = SetSlotsAction;
var ClearSlotsAction = /** @class */ (function (_super) {
    __extends(ClearSlotsAction, _super);
    function ClearSlotsAction() {
        var _this = _super.call(this, ItemType.ClearSlotsAction) || this;
        _this.slotNames = [];
        return _this;
    }
    return ClearSlotsAction;
}(DynamicContentItem));
exports.ClearSlotsAction = ClearSlotsAction;
var AnalyticsEventAction = /** @class */ (function (_super) {
    __extends(AnalyticsEventAction, _super);
    function AnalyticsEventAction() {
        var _this = _super.call(this, ItemType.AnalyticsEventAction) || this;
        _this.eventName = '';
        return _this;
    }
    return AnalyticsEventAction;
}(DynamicContentItem));
exports.AnalyticsEventAction = AnalyticsEventAction;
var MultipleChoiceItem = /** @class */ (function (_super) {
    __extends(MultipleChoiceItem, _super);
    function MultipleChoiceItem() {
        var _this = _super.call(this, ItemType.MultipleChoiceItem) || this;
        _this.displayName = '';
        _this.value = '';
        return _this;
    }
    return MultipleChoiceItem;
}(DynamicContentItem));
exports.MultipleChoiceItem = MultipleChoiceItem;
//////////////////////////////////////////////////////////////////////////////////////////
// Message Threads ///////////////////////////////////////////////////////////////////////
var MessageThread = /** @class */ (function (_super) {
    __extends(MessageThread, _super);
    function MessageThread() {
        var _this = _super.call(this, ItemType.MessageThread) || this;
        _this.messages = [];
        return _this;
    }
    return MessageThread;
}(DynamicContentItem));
exports.MessageThread = MessageThread;
// export type Message =
//   | TextMessage
//   | ImageMessage
//   | FileMessage
//   | ListMessage
//   | CarouselMessage;
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(type) {
        return _super.call(this, type) || this;
    }
    return Message;
}(DynamicContentItem));
exports.Message = Message;
var TextMessage = /** @class */ (function (_super) {
    __extends(TextMessage, _super);
    function TextMessage() {
        var _this = _super.call(this, ItemType.TextMessage) || this;
        _this.text = '';
        return _this;
    }
    return TextMessage;
}(Message));
exports.TextMessage = TextMessage;
var ImageMessage = /** @class */ (function (_super) {
    __extends(ImageMessage, _super);
    function ImageMessage() {
        var _this = _super.call(this, ItemType.ImageMessage) || this;
        _this.text = '';
        _this.imageUrl = '';
        return _this;
    }
    return ImageMessage;
}(Message));
exports.ImageMessage = ImageMessage;
var FileMessage = /** @class */ (function (_super) {
    __extends(FileMessage, _super);
    function FileMessage() {
        var _this = _super.call(this, ItemType.FileMessage) || this;
        _this.text = '';
        _this.fileUrl = '';
        return _this;
    }
    return FileMessage;
}(Message));
exports.FileMessage = FileMessage;
var ListMessage = /** @class */ (function (_super) {
    __extends(ListMessage, _super);
    function ListMessage() {
        var _this = _super.call(this, ItemType.ListMessage) || this;
        _this.items = [];
        return _this;
    }
    return ListMessage;
}(Message));
exports.ListMessage = ListMessage;
var CarouselMessage = /** @class */ (function (_super) {
    __extends(CarouselMessage, _super);
    function CarouselMessage() {
        var _this = _super.call(this, ItemType.CarouselMessage) || this;
        _this.items = [];
        return _this;
    }
    return CarouselMessage;
}(Message));
exports.CarouselMessage = CarouselMessage;
var MessageCard = /** @class */ (function (_super) {
    __extends(MessageCard, _super);
    function MessageCard() {
        var _this = _super.call(this, ItemType.MessageCard) || this;
        _this.type = '';
        _this.title = '';
        _this.description = '';
        _this.imageUrl = '';
        _this.buttons = [];
        return _this;
    }
    return MessageCard;
}(DynamicContentItem));
exports.MessageCard = MessageCard;
// Note: enum values are expected CDML values
var MessageCardImageSize;
(function (MessageCardImageSize) {
    MessageCardImageSize["Compact"] = "compact";
    MessageCardImageSize["Large"] = "large";
})(MessageCardImageSize = exports.MessageCardImageSize || (exports.MessageCardImageSize = {}));
// | ReplyButton
// | LocationRequestButton
// | ShareButton
// Note: enum values are expected CDML values
var ButtonType;
(function (ButtonType) {
    ButtonType["Link"] = "link";
    ButtonType["Webview"] = "webview";
    // Buy = 'buy',
    ButtonType["Postback"] = "postback";
    // Reply = 'reply',
    // LocationRequest = 'location_request',
    // Share = 'share'
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var LinkButton = /** @class */ (function (_super) {
    __extends(LinkButton, _super);
    function LinkButton() {
        var _this = _super.call(this, ItemType.LinkButton) || this;
        _this.buttonType = ButtonType.Link;
        _this.text = '';
        _this.uri = '';
        return _this;
    }
    return LinkButton;
}(DynamicContentItem));
exports.LinkButton = LinkButton;
var WebviewButton = /** @class */ (function (_super) {
    __extends(WebviewButton, _super);
    function WebviewButton() {
        var _this = _super.call(this, ItemType.WebviewButton) || this;
        _this.buttonType = ButtonType.Webview;
        _this.text = '';
        _this.uri = '';
        _this.fallbackUri = '';
        _this.size = WebviewSize.Compact;
        return _this;
    }
    return WebviewButton;
}(DynamicContentItem));
exports.WebviewButton = WebviewButton;
// Note: enum values are expected CDML values
var WebviewSize;
(function (WebviewSize) {
    WebviewSize["Compact"] = "compact";
    WebviewSize["Tall"] = "tall";
    WebviewSize["Full"] = "full";
})(WebviewSize = exports.WebviewSize || (exports.WebviewSize = {}));
var PostbackButton = /** @class */ (function (_super) {
    __extends(PostbackButton, _super);
    function PostbackButton() {
        var _this = _super.call(this, ItemType.PostbackButton) || this;
        _this.buttonType = ButtonType.Postback;
        _this.text = '';
        _this.payload = {
            handler: '',
            data: {}
        };
        return _this;
    }
    return PostbackButton;
}(DynamicContentItem));
exports.PostbackButton = PostbackButton;

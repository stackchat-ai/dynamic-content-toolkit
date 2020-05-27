# @stackchat/dynamic-content-toolkit

The `@stackchat/dynamic-content-toolkit` helps you build dynamic conversations on the [Stackchat](https://stackchat.com) platform. It is used exclusively by [Cloud Functions](https://docs.stackchat.com/Bot-Builder/Cloud-Functions/Introduction.html), which are custom JavaScript functions that can be executed at any point in your conversation flow. Cloud Functions must return an array of Dynamic Content Items in order to dynamically generate conversations at runtime.


# Installation
You can install the dynamic content toolkit using your favourite javacript package manager or directly include the files from the `/lib` dir in this repo.

## npm and yarn

```
npm i @stackchat/dynamic-content-toolkit

yarn @stackchat/dynamic-content-toolkit
```

# Usage
## A note on import conventions
The examples in the rest of this README import specific items directly -- this is suitable for externally bundled and uploaded code. To use the dynamic content toolkit items in the dashboard editor, use the pre-imported `dc` namespace as shown here:
```js
export function myCloudFunction() {
  const textMessage = new dc.TextMessage();
  textMessage.text = "Hello, world!";
  const messageThread = new dc.MessageThread();
  messageThread.messages = [ textMessage ];
  return [ messageThread ];
}
```

For NPM/yarn projects, use the following conventions:
```js
// Example Cloud Function that uses Dynamic Content Toolkit
import { MessageThread, TextMessage } from "@stackchat/dynamic-content-toolkit";

export const myCloudFunction = () => {
  const textMessage = new TextMessage();
  textMessage.text = "Hello, world!";
  const messageThread = new MessageThread();
  messageThread.messages = [ textMessage ];
  return [ messageThread ];
}
```

Contents:

- [`MessageThread`](#messagethread)
- [`ActionSequence`](#actionsequence)
- [`Navigation`](#navigation)
- [`Dynamic Multiple Choice Items`](#dynamic-multiple-choice-items)

## MessageThread

`MessageThread` is a top level class that allows you to display a collection of messages of various types, such as text, images and carousels.

### Properties

- `messages` : An array of messages to display to the user

### Usage

`MessageThread`'s `messages` property is a container for individual message objects. You can add as many or as few messages you like. The only requirement is that there should be at least one message in a `MessageThread`. Below are all of the different types of messages you can use:

#### `TextMessage`

```js
// Import required classes
import { TextMessage } from "@stackchat/dynamic-content-toolkit";

const textMessage = new TextMessage();
textMessage.text = "Hello, world!";
```

#### `ImageMessage`

```js
// Import required classes
import { ImageMessage } from "@stackchat/dynamic-content-toolkit";

const imageMessage = new ImageMessage();
imageMessage.imageUrl = "https://placekitten.com/320/320";
```

#### `ListMessage`

```js
// Import required classes
import {
  LinkButton,
  WebviewButton,
  PostbackButton
} from "@stackchat/dynamic-content-toolkit";

// Create a LinkButton
const linkButton = new LinkButton();
linkButton.text = "Link Button";
linkButton.uri = "https://stackchat.com";

// Create a WebviewButton
const webviewButton = new WebviewButton();
webviewButton.text = "Webview Button";
webviewButton.uri = "https://stackchat.com";

// Create a PostbackButton
const postbackButton = new PostbackButton();
postbackButton.text = "Postback Button";
postbackButton.payload = {
  /**
   * This is the name any of the exported functions from your
   * cloud functions code. The `data` object is sent to the
   * specified function when the user clicks or taps on the
   * button.
   */
  handler: "myCloudFunction",
  /**
   * An object with key-value pairs
   */
  data: {
    ...
  }
}
```

```js
// Import required classes
import {
  ListMessage,
  MessageCard
} from "@stackchat/dynamic-content-toolkit";

// Create message cards
const itemOne = new MessageCard();
itemOne.imageUrl = "https://placekitten.com/320/320";
itemOne.title = "Item 1";
itemOne.description = "This is a description for item 1";
itemOne.size = MessageCardImageSize.Compact
itemOne.buttons = [ linkButton, webviewButton, postbackButton ];

// Create a ListMessage
const listMessage = new ListMessage();
listMessage.items = [ itemOne ];
```

`CarouselMessage`

```js
// Import required classes
import {
  CarouselMessage,
  MessageCard
} from "@stackchat/dynamic-content-toolkit";

// Create message cards
const itemOne = new MessageCard();
itemOne.imageUrl = "https://placekitten.com/320/320";
itemOne.title = "Item 1";
itemOne.description = "This is a description for item 1";
itemOne.size = MessageCardImageSize.Compact;
itemOne.buttons = [ linkButton, webviewButton, postbackButton ];

// Create a CarouselMessage
const listMessage = new CarouselMessage();
listMessage.items = [ itemOne ];
```

`MessageThread`

```js
// Import required classes
import { MessageThread } from "@stackchat/dynamic-content-toolkit";

// Create a MessageThread
const messageThread = new MessageThread();
messageThread.messages = [
  textMessage,
  imageMessage,
  listMessage,
  carouselMessage
];
```
You'll notice that it's not yet possible to create User Input Groups via the Dynamic Content Toolkit, however it's still possible to display dynamic content in a User Input Group - see the section titled "Dynamic Content in User Input Groups" at the bottom of this page for tips how.


## ActionSequence

`ActionSequence` is a top level class that allows you to sequentially execute a collection of `ActionItems`. This allows you to do things like clearing/setting slot values or triggering analytics events from your Cloud Function.

### Properties

- `actions` : The collection of actions to execute

### Usage

`ActionSequence`'s `actions` property is a container for individual actions. You can add as many or as few actions depending on your needs. The only requirement is that there should be at least one action in an `ActionSequence`. Below are all of the different types of actions you can use:

#### `SetSlotsAction`

```js
// Import required classes
import { SetSlotsAction } from "@stackchat/dynamic-content-toolkit";

const setSlotsAction = new SetSlotsAction();
/**
 * The `slots` property is an object of slots in your bot
 * and the values you would like to set them to. In the example
 * below, `Slot1`, `Slot2` and `Slot3` are slot names as they
 * appear in your bot in Stackchat Studio. The desired values
 * for each slot goes against each of the slots.
 */
setSlotsAction.slots = {
  Slot1: "Value 1",
  Slot2: "Value 2",
  Slot3: "Value 3"
};
```

#### `ClearSlotsAction`

```js
// Import required classes
import { ClearSlotsAction } from "@stackchat/dynamic-content-toolkit";

const clearSlotsAction = new ClearSlotsAction();
/**
 * The `slotNames` property is an array of slots in your bot.
 * In the example below, `Slot1`, `Slot2` and `Slot3` are slot
 * names as they appear in your bot in Stackchat Studio. All
 * of the slots mentioned will have their values cleared once
 * this action is executed.
 */
clearSlotsAction.slotNames = [ "Slot1", "Slot2", "Slot3" ];
```

#### `AnalyticsEventAction`

```js
// Import required classes
import { AnalyticsEventAction } from "@stackchat/dynamic-content-toolkit";

const analyticsEventAction = new AnalyticsEventAction();

// The `eventName` property is required, but this value is ignored by Adobe Analytics.
analyticsEventAction.eventName = "Event 1";
/**
 * The `eventData` property is an optional object that is sent as a straight
 * pass-through to your configured analytics provider. It is an object with
 * arbitary key-value mappings that should map to the values expected by your
 * analytics provider. For example, if you're using Adobe Analytics,
 * `eventData` might look something like this:
 * {
 *    prop1: 'value1',
 *    prop3: 'value2',
 *    events: 'event3,event4'
 * }
 */
analyticsEventAction.eventData = {
  ...
}
```

`ActionSequence`

```js
// Import required classes
import { ActionSequence } from "@stackchat/dynamic-content-toolkit";

// Create an ActionSequence
const actionSequence = new ActionSequence();
actionSequence.actions = [
  setSlotsAction,
  clearSlotsAction,
  analyticsEventAction
];
```



## Navigation

When a [Cloud Functions](https://docs.stackchat.com/Bot-Builder/Cloud-Functions/Introduction.html) is defined in Stackchat Studio, a "Continue To" navigation target may be defined, which will navigate the user accordingly once execution is complete. However, you may want to override this value if certain conditions are met, so the `Navigation` class is made available to you. This a top level class that will trigger navigation to another flow or flow element in your bot.

### Properties

- `continueTo` : The flow or flow element to navigate to once your cloud function completes execution. Expects a string containing two tokens in the format of `flow_name`:`flow_element_name`. `flow_name` can be replaced by `_` to indicate the current flow and `flow_element_name` can be replaced by `*` to indicate the default entry element for the flow referenced in the first token, otherwise these values should be the actual names of the flow / flow element you want to navigate to.

### Usage

```js
// Import required classes
import { Navigation } from "@stackchat/dynamic-content-toolkit";

// Create an ActionSequence
const navigation = new Navigation();
navigation.continueTo = "Flow One: *";
```

The `continueTo` property accepts a flow, a flow element or both in the following syntax:

```js
<Flow>:<Flow Element>
```

where:

- `Flow` : This is the name of the flow you wish the user to navigate to. As a convenience, you can use `_` to indicate the current flow name.
- `Flow Element` : The is the name of the flow element you wish the user to navigate to. As a convenience, you can use `*` to indicate the default entry element for the flow referenced in the first token.

Keeping the above syntax in mind, following are various possible combinations that can be used as valid `continueTo` values:

```js
/**
 * For demonstration purpose, let us assume we have a bot
 * with flows as `Flow One`, `Flow Two` and `Flow Three`. Further
 * more, let us assume each of the above flows have three elements
 * therein named as `Element One`, `Element Two` and `Element Three`.
 *
 * The structure would be as follows:
 * {
 *		'Flow One': [ `Element One`, `Element Two`, `Element Three ~ default` ],
 *		'Flow Two': [ `Element One`, `Element Two ~ default`, `Element Three` ],
 *		'Flow Three': [ `Element One ~ default`, `Element Two`, `Element Three` ]
 * }
 *
 * We are assuming that `Element 2` inside `Flow 2` is the element
 * that triggered our cloud function execution.
 *
 * On the above basis, the following are valid `continueTo` values:
 */
const possibleValues = [
  "Flow One:*", // Continue to the default element of `Flow One`, i.e `Element Three`,
  "_:*", // Continue to the default element of the current flow i.e. `Flow Two, Element Two`,
  "_:Element Three", // Continue to the `Element Three` of current flow, i.e. `Flow Two`,
	"Flow One:Element Three", // Continue to `Element Three` in `Flow One`
];
```

## Dynamic User Input Groups
You'll notice that it's not yet possible to create User Input Groups via the Dynamic Content Toolkit, however it's still possible to display dynamic data in a User Input Group. This is done creating a User Input Group in Stackchat Studio, but referencing slots for certain values. These slots can then be populated dynamically in Cloud Functions.

### Dynamic Multiple Choice Items
A common use case is to display multiple choice items in a user input that are dynamically fetched at runtime based on how the user is interacting with your bot. For example, in a bot that presents a user with a list of books choices, you might want to filter the list of books based on the genre user has specified earlier in the interaction.

You can complete the following steps so as to enable this behaviour:

1. Create a "multiple choice" type slot to store the user's selection, e.g `BookSelection`
2. Create a string type slot to store the dynamically fetched choices - `BookChoices`
3. Open Stackchat Studio and add a "User Input Group" to the message thread where you would like to present the user with the choices.
4. In the user input group, add your `BookSelection` slot, but do not add any choices to it.
5. Now, click on "Edit CDML" button in the left hand side menu and find your newly added user input group. It should look like this:

```yaml
- user_input_group:
  require_confirmation: false
  items:
    - multiple_choice:
        slot_name: BookSelection
        label: Book Selection
        prompt: 'Please select a book'
```

6. Add a 'choices' property to the CDML so that it looks like this:

```yaml
- user_input_group:
  require_confirmation: false
  items:
    - multiple_choice:
        slot_name: BookSelection
        label: Book Selection
        prompt: 'Please select a book'
        choices:
        	- response_val: '${BookChoices}'
```

7. Now we need to populate `BookChoices` with some dynamic data. In your cloud function code, add a `SetSlotsAction` like below:

```js
// Import required classes
import {
  ActionSequence,
  SetSlotsAction,
  MultipleChoiceItem
} from "@stackchat/dynamic-content-toolkit";

export const populateOptions = () => {
  const data = ...; // your logic of fetching options

  const items = [];
  data.forEach(dataItem => {
    const item = new MultipleChoiceItem();
    item.iconUrl = dataItem.image;
    item.displayName = dataItem.name;
    item.value = dataItem.value;

    items.push(item);
  })

  const setSlotsAction = new SetSlotsAction();
  setSlotsAction.slots = {
    /**
     * Although you declared "SlotB" to be a string, you will
     * be able to use it as an array in the bot
     */
    BookChoices: items
  };


  // Create an ActionSequence
  const actionSequence = new ActionSequence();
  actionSequence.actions = [ setSlotsAction ];

  return [ actionSequence ];
}
```

8. Finally, open Stackchat Studio and add a "Cloud Function" element before the "Message Thread" element containing the user input group that you added in Step 3. Configure it to execute the function you exported in step 6 - in our case `populateOptions`. That way, the slot will be populated just before it's presented to the user in the user input group.

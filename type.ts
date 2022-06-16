import {
  Action,
  TextMessage,
  ImageMessage,
  VideoMessage,
  TemplateButtons,
  ImageMapMessage,
  Area,
  FlexMessage,
  TemplateImageCarousel,
  TemplateCarousel,
  URIAction as LineUriAction,
  PostbackAction,
  MessageAction,
  DatetimePickerAction,
  RichMenuSwitchAction,
  TemplateColumn,
} from "@line/bot-sdk";

export type IncomingMessage = {
  networkId: string;
  userId: string;
  channelId: string;
  type: "text";
  payload: string;
  metadata?: Record<string, unknown>;
};

export type TemplateHookResponse = {
  outgoingMessage: OutgoingMessage;
  shouldContextualize: boolean;
};

//TODO replace from Userservice
export type User = {
  userId: string;
  info: Record<string, unknown>;
  richMenuId?: string;
  externalUserId?: string;
  metadata?: Record<string, unknown>;
};

//TODO replace from Channelservice
export type Channel = {
  channelId: string;
  botInfo?: BotInfo;
};

export type Intent = {
  intentName: string;
  confidence: number;
};

export type Entity = {
  entityName: string;
  entityValue: string;
};

export type Conversation = {
  intent?: Intent;
  entities?: Entity[];
};

export type ContextAction = {
  action: string;
  metadata?: Record<string, unknown>;
};

export type sendHookTemplateParams = {
  network: Network;
  botContext: BotContextWithOutgoing & {
    outgoingMessage: OutgoingMessage;
  };
};

export type processActionParams = {
  botContext: BotContext;
  getNetworkById: Function;
};

// replace with context class
export type BotContext = {
  transactionId: string;
  networkId: string;
  user: User;
  action: ContextAction;
  channel: Channel;
  conversation?: Conversation;
  incomingMessage?: IncomingMessage;
};

export type BotContextWithOutgoing = {
  outgoingMessage: OutgoingMessage;
} & BotContext;

export type flowEngines = {
  flowEngineId: string;
  flowEngineEndpoint: string;
};

export type NetworkConfig = {
  defaultFallbackAction?: ContextAction;
  confidenceThreshold: number;
  flowEngines: flowEngines[];
  hooks?: {
    template?: string;
  };
};

// replace from @megabot/network
export type Network = {
  config: NetworkConfig;
  networkId: string;
};

// export type URIAction = {
//   type: "uri";
//   uri: string;
//   altUri?: AltURI;
// };

export type ICallAction = {
  id: string;
  label: string;
  phoneNo: string;
  type: "call_action";
};

export type IFlowAction = {
  id: string;
  label: string;
  flowId: string;
  type: "flow_action";
};

export type ITemplateAction = {
  id: string;
  type: "template_action";
  label: string;
  templateId: string;
};

export type IDefaultAction = {
  id: string;
} & Action;

export type IPostBackAction = {
  id: string;
  label: string;
} & PostbackAction;

export type IURIAction = {
  id: string;
  label: string;
} & LineUriAction;

export type IMessageAction = {
  id: string;
  label: string;
} & MessageAction;

export type IDatetimePickerAction = {
  id: string;
  label: string;
} & DatetimePickerAction;

export type IRichMenuSwitchAction = {
  id: string;
  label: string;
} & Omit<RichMenuSwitchAction, "label">;

export type IAction =
  | IPostBackAction
  | IURIAction
  | IMessageAction
  | IDatetimePickerAction
  | IRichMenuSwitchAction
  | ICallAction
  | IFlowAction
  | ITemplateAction;

export type IPlatform = "line" | "facebook" | "webchat";

export type ITextMessage = CustomQuickReply<TextMessage> & {
  id: string;
};

export type IVideoMessage = CustomQuickReply<VideoMessage> & {
  id: string;
};

export type ICarouselItem = Omit<TemplateColumn, 'actions'> & {
  id: string;
  actions: IAction[];
  isActive: boolean;
  index: number;
};

export type ICarouselMessage = Omit<CustomQuickReply<TemplateCarousel>, 'columns'> & {
  id: string;
  altText: string;
  columns: ICarouselItem[];
};

export type ImageCarouselItem = {
  id: string;
  imageUrl: string;
  action: IAction;
  isActive: boolean;
  index: number;
};

export type IImageCarousel = Omit<CustomQuickReply<TemplateImageCarousel>, 'columns'> & {
  id: string;
  altText: string;
  columns: ImageCarouselItem[];
};

export type IFlexMessage = CustomQuickReply<FlexMessage> & {
  id: string;
};

export type IImageMessage = CustomQuickReply<ImageMessage> & {
  id: string;
};

export type IImageMapAction = IAction & {
  area: Area;
};

export type IImageMapMessage = Omit<CustomQuickReply<ImageMapMessage>, "actions"> & {
  id: string;
  altText: string;
  imgUrl: string;
  imgHeight: number;
  imgWidth: number;
  actions: IImageMapAction[];
};

export type IButtonsMessage = Omit<CustomQuickReply<TemplateButtons>, "actions"> & {
  id: string;
  altText: string;
  actions: IAction[];
};

export type IMessage =
  | ITextMessage
  | IImageMessage
  | IVideoMessage
  | IButtonsMessage
  | IImageMapMessage
  | IFlexMessage
  | IImageCarousel
  | ICarouselMessage;

// export type IVariation = {
//   id: string;
//   messages: IMessage[];
// };

export type ITemplate = {
  id: string;
  networkId: string;
  name: string;
  platforms: IPlatform[];
  messages: IMessage[];
  createdBy: string;
  tags?: string[];
};

export type OutgoingMessage = {
  userId: string;
  channelId: string;
  messages?: IMessage[];
};
export type isTemplateActionParams = {
  action: string;
};

export type findTemplateByActionParams = {
  action: string;
  networkId: string;
};

export type BotInfo = Record<string, string>;

export type contextualizeInfoParams = {
  outgoingMessage: OutgoingMessage;
  botInfo?: BotInfo;
  user: User;
};

export type processTemplateActionParams = {
  botContext: BotContext;
  network: Network;
  action: ContextAction;
};

export type processFlowActionParams = {
  botContext: BotContext;
  action: ContextAction;
  network: Network;
};

export type getGlobalActionByPayloadParams = {
  payload: string;
  networkId: string;
};

export type IQuickReply = {
  items: {
    type: 'action';
    imageUrl?: string;
    action: IAction;
  }[];
};

export type CustomQuickReply<T> = Omit<T, 'quickReply'> & {
  quickReply?: IQuickReply;
};
/* eslint-disable */
import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: { input: string; output: string };
  Guid: { input: string; output: string };
};

export type Article = Item & {
  __typename: "Article";
  /** The content item's predefined system fields. */
  _system_: Sys;
  bodyCopy: RichText;
  image: AssetCollection;
  introduction: Scalars["String"]["output"];
  /** @deprecated Use 'publishDate_with_timezone' instead. */
  publishDate?: Maybe<Scalars["DateTime"]["output"]>;
  publishDate_with_timezone?: Maybe<DateAndTime>;
  title: Scalars["String"]["output"];
};

export type ArticleImageArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ArticleAll = {
  __typename: "Article_All";
  items: Array<Article>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type ArticleOrder = {
  _system_?: InputMaybe<SystemOrder>;
  introduction?: InputMaybe<OrderEnum>;
  publishDate?: InputMaybe<OrderEnum>;
  publishDate_with_timezone?: InputMaybe<DateAndTimeElementOrder>;
  title?: InputMaybe<OrderEnum>;
};

export type ArticleWhere = {
  AND?: InputMaybe<Array<ArticleWhere>>;
  OR?: InputMaybe<Array<ArticleWhere>>;
  _system_?: InputMaybe<SystemFilter>;
  introduction?: InputMaybe<TextFilter>;
  publishDate?: InputMaybe<DateTimeFilter>;
  publishDate_with_timezone?: InputMaybe<DateAndTimeElementFilter>;
  title?: InputMaybe<TextFilter>;
};

export type Event = Item & {
  __typename: "Event";
  /** The content item's predefined system fields. */
  _system_: Sys;
  description: RichText;
  /** @deprecated Use 'endDate_with_timezone' instead. */
  endDate?: Maybe<Scalars["DateTime"]["output"]>;
  endDate_with_timezone?: Maybe<DateAndTime>;
  eventTopic: TaxonomyTermCollection;
  eventType: TaxonomyTermCollection;
  image: AssetCollection;
  name: Scalars["String"]["output"];
  /** @deprecated Use 'startDate_with_timezone' instead. */
  startDate?: Maybe<Scalars["DateTime"]["output"]>;
  startDate_with_timezone?: Maybe<DateAndTime>;
};

export type EventEventTopicArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type EventEventTypeArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type EventImageArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type EventAll = {
  __typename: "Event_All";
  items: Array<Event>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type EventOrder = {
  _system_?: InputMaybe<SystemOrder>;
  endDate?: InputMaybe<OrderEnum>;
  endDate_with_timezone?: InputMaybe<DateAndTimeElementOrder>;
  name?: InputMaybe<OrderEnum>;
  startDate?: InputMaybe<OrderEnum>;
  startDate_with_timezone?: InputMaybe<DateAndTimeElementOrder>;
};

export type EventWhere = {
  AND?: InputMaybe<Array<EventWhere>>;
  OR?: InputMaybe<Array<EventWhere>>;
  _system_?: InputMaybe<SystemFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  endDate_with_timezone?: InputMaybe<DateAndTimeElementFilter>;
  eventTopic?: InputMaybe<ArrayFilter>;
  eventType?: InputMaybe<ArrayFilter>;
  name?: InputMaybe<TextFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  startDate_with_timezone?: InputMaybe<DateAndTimeElementFilter>;
};

export type LandingPage = Item & {
  __typename: "LandingPage";
  /** The content item's predefined system fields. */
  _system_: Sys;
  bodyCopy: LandingPageBodyCopy;
  featuredContent: LandingPageFeaturedContentCollection;
  headline: Scalars["String"]["output"];
  heroImage: AssetCollection;
  subheadline: Scalars["String"]["output"];
};

export type LandingPageFeaturedContentArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LandingPageHeroImageArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LandingPageAll = {
  __typename: "LandingPage_All";
  items: Array<LandingPage>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type LandingPageBodyCopy = {
  __typename: "LandingPage_BodyCopy";
  /** Contains metadata of the assets inserted into the rich text. */
  assets: RichTextAssetCollection;
  components: LandingPageBodyCopyComponentsCollection;
  /** The rich text's HTML output. Contains references to assets, links to content items, linked content, and components. */
  html: Scalars["String"]["output"];
  itemHyperlinks: ItemCollection;
  linkedItems: LandingPageBodyCopyLinkedItemsCollection;
};

export type LandingPageBodyCopyAssetsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LandingPageBodyCopyComponentsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LandingPageBodyCopyItemHyperlinksArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LandingPageBodyCopyLinkedItemsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LandingPageBodyCopyComponentsCollection = {
  __typename: "LandingPage_BodyCopy_Components_Collection";
  items: Array<Video>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type LandingPageBodyCopyLinkedItemsCollection = {
  __typename: "LandingPage_BodyCopy_LinkedItems_Collection";
  items: Array<Video>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type LandingPageFeaturedContent = Article | Event;

export type LandingPageFeaturedContentCollection = {
  __typename: "LandingPage_FeaturedContent_Collection";
  items: Array<LandingPageFeaturedContent>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type LandingPageOrder = {
  _system_?: InputMaybe<SystemOrder>;
  headline?: InputMaybe<OrderEnum>;
  subheadline?: InputMaybe<OrderEnum>;
};

export type LandingPageWhere = {
  AND?: InputMaybe<Array<LandingPageWhere>>;
  OR?: InputMaybe<Array<LandingPageWhere>>;
  _system_?: InputMaybe<SystemFilter>;
  featuredContent?: InputMaybe<ArrayFilter>;
  headline?: InputMaybe<TextFilter>;
  subheadline?: InputMaybe<TextFilter>;
};

export type Solution = Item & {
  __typename: "Solution";
  /** The content item's predefined system fields. */
  _system_: Sys;
  headline: Scalars["String"]["output"];
  image: AssetCollection;
  introduction: Scalars["String"]["output"];
};

export type SolutionImageArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type SolutionAll = {
  __typename: "Solution_All";
  items: Array<Solution>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type SolutionOrder = {
  _system_?: InputMaybe<SystemOrder>;
  headline?: InputMaybe<OrderEnum>;
  introduction?: InputMaybe<OrderEnum>;
};

export type SolutionWhere = {
  AND?: InputMaybe<Array<SolutionWhere>>;
  OR?: InputMaybe<Array<SolutionWhere>>;
  _system_?: InputMaybe<SystemFilter>;
  headline?: InputMaybe<TextFilter>;
  introduction?: InputMaybe<TextFilter>;
};

export type Video = Item & {
  __typename: "Video";
  /** The content item's predefined system fields. */
  _system_: Sys;
  autoplay: MultipleChoiceOptionCollection;
  caption: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  headline: Scalars["String"]["output"];
  videoLink: Scalars["String"]["output"];
};

export type VideoAutoplayArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type VideoAll = {
  __typename: "Video_All";
  items: Array<Video>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type VideoOrder = {
  _system_?: InputMaybe<SystemOrder>;
  caption?: InputMaybe<OrderEnum>;
  description?: InputMaybe<OrderEnum>;
  headline?: InputMaybe<OrderEnum>;
  videoLink?: InputMaybe<OrderEnum>;
};

export type VideoWhere = {
  AND?: InputMaybe<Array<VideoWhere>>;
  OR?: InputMaybe<Array<VideoWhere>>;
  _system_?: InputMaybe<SystemFilter>;
  autoplay?: InputMaybe<ArrayFilter>;
  caption?: InputMaybe<TextFilter>;
  description?: InputMaybe<TextFilter>;
  headline?: InputMaybe<TextFilter>;
  videoLink?: InputMaybe<TextFilter>;
};

export type ArrayFilter = {
  /** Checks if the field's array values match all values in the specified array. */
  containsAll?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Checks if the field's array values match at least one of the values in the specified array. */
  containsAny?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Checks if the field value is an empty array. */
  isEmpty?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Asset = AssetInterface & {
  __typename: "_Asset";
  /** The asset's alt text description for a specific language. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The image's height in pixels. */
  height?: Maybe<Scalars["Int"]["output"]>;
  /** The asset's display name. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** List of renditions available for this asset. */
  renditions?: Maybe<AssetRenditionCollection>;
  /** The file's size in bytes. */
  size?: Maybe<Scalars["Int"]["output"]>;
  /** The file's MIME type. */
  type?: Maybe<Scalars["String"]["output"]>;
  /** The asset's absolute URL. */
  url: Scalars["String"]["output"];
  /** The image's width in pixels. */
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type AssetRenditionsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AssetCollection = {
  __typename: "_AssetCollection";
  /** Individual asset objects. */
  items: Array<Asset>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type AssetInterface = {
  /** The asset's alt text description for a specific language. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The image's height in pixels. */
  height?: Maybe<Scalars["Int"]["output"]>;
  /** The asset's display name. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** The file's size in bytes. */
  size?: Maybe<Scalars["Int"]["output"]>;
  /** The file's MIME type. */
  type?: Maybe<Scalars["String"]["output"]>;
  /** The asset's absolute URL. */
  url: Scalars["String"]["output"];
  /** The image's width in pixels. */
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type AssetRenditionCollection = {
  __typename: "_AssetRenditionCollection";
  /** Individual asset rendition objects. */
  items: Array<Rendition>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type CodenameFilter = {
  /** Checks if the codename matches exactly to the specified filter value. */
  eq?: InputMaybe<Scalars["String"]["input"]>;
  /** Checks if the codename matches at least one of the specified array values. */
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Checks if the codename is different than the specified value. */
  notEq?: InputMaybe<Scalars["String"]["input"]>;
  /** Checks if the codename is different than the specified array values. */
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type Collection = {
  __typename: "_Collection";
  /** The collection's predefined system fields. */
  _system_: CollectionSys;
};

export type CollectionSys = {
  __typename: "_CollectionSys";
  /** The collection's codename. */
  codename: Scalars["String"]["output"];
};

export type ContentType = {
  __typename: "_ContentType";
  /** The content type's predefined system fields. */
  _system_: ContentTypeSys;
};

export type ContentTypeSys = {
  __typename: "_ContentTypeSys";
  /** The content type's codename. */
  codename: Scalars["String"]["output"];
  /** The content type's display name. */
  name: Scalars["String"]["output"];
};

export type DateAndTime = {
  __typename: "_DateAndTime";
  /** The element's display timezone. */
  display_timezone?: Maybe<Scalars["String"]["output"]>;
  /** The element's datetime output. */
  value?: Maybe<Scalars["DateTime"]["output"]>;
};

/** Allows filtering based on datetime element's value. */
export type DateAndTimeElementFilter = {
  /** The element's datetime output. */
  value?: InputMaybe<DateTimeFilter>;
};

/** Allows ordering based on datetime element's value. */
export type DateAndTimeElementOrder = {
  /** The element's datetime output. */
  value?: InputMaybe<OrderEnum>;
};

export type DateTimeFilter = {
  /** Checks if the field's DateTime value matches exactly to the specified ISO-8610 formatted value. */
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Checks if the field's DateTime value is greater than the specified ISO-8610 formatted value. */
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Checks if the field's DateTime value is greater than or equal to the specified ISO-8610 formatted value. */
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Checks if the field's DateTime value matches at least one of the specified array values. */
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  /** Checks if the field's DateTime value is less than the specified ISO-8610 formatted value. */
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Checks if the field's DateTime value is less than or equal to the specified ISO-8610 formatted value. */
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Checks if the field's DateTime value is different than the specified ISO-8610 formatted value. */
  notEq?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Checks if the field's DateTime value is different than the specified array values. */
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
};

export type IdFilter = {
  /** Checks if the ID matches exactly to the specified filter value. */
  eq?: InputMaybe<Scalars["Guid"]["input"]>;
  /** Checks if the ID matches at least one of the specified array values. */
  in?: InputMaybe<Array<Scalars["Guid"]["input"]>>;
  /** Checks if the ID is different than the specified value. */
  notEq?: InputMaybe<Scalars["Guid"]["input"]>;
  /** Checks if the ID is different than the specified array values. */
  notIn?: InputMaybe<Array<Scalars["Guid"]["input"]>>;
};

export type Item = {
  /** The content item's predefined system fields. */
  _system_: Sys;
};

export type ItemCollection = {
  __typename: "_ItemCollection";
  /** Individual item or component objects. */
  items: Array<Item>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type Language = {
  __typename: "_Language";
  /** The language's predefined system fields. */
  _system_: LanguageSys;
};

export type LanguageFilter = {
  /** Specifies the language's codename. */
  languageCodename: Scalars["String"]["input"];
};

export type LanguageSys = {
  __typename: "_LanguageSys";
  /** The language's codename. */
  codename: Scalars["String"]["output"];
  /** The language's display name. */
  name: Scalars["String"]["output"];
};

export type MultipleChoiceOption = {
  __typename: "_MultipleChoiceOption";
  /** The multiple choice option's predefined system fields. */
  _system_: MultipleChoiceOptionSys;
};

export type MultipleChoiceOptionCollection = {
  __typename: "_MultipleChoiceOptionCollection";
  /** Individual multiple choice option objects. */
  items: Array<MultipleChoiceOption>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type MultipleChoiceOptionSys = {
  __typename: "_MultipleChoiceOptionSys";
  /** The multiple choice option's codename. */
  codename: Scalars["String"]["output"];
  /** The multiple choice option's display name. */
  name: Scalars["String"]["output"];
};

export type OrderEnum =
  /** Ascending order. */
  | "asc"
  /** Descending order. */
  | "desc";

export type Rendition = {
  __typename: "_Rendition";
  height: Scalars["Int"]["output"];
  preset: Scalars["String"]["output"];
  preset_id: Scalars["String"]["output"];
  query: Scalars["String"]["output"];
  rendition_id: Scalars["String"]["output"];
  width: Scalars["Int"]["output"];
};

export type RichText = {
  __typename: "_RichText";
  /** Contains metadata of the assets inserted into the rich text. */
  assets: RichTextAssetCollection;
  /** Contains metadata of the components inserted into the rich text. */
  components: ItemCollection;
  /** The rich text's HTML output. Contains references to assets, links to content items, linked content, and components. */
  html: Scalars["String"]["output"];
  /** Contains metadata of the content items referenced in hyperlinks. */
  itemHyperlinks: ItemCollection;
  /** Contains metadata of the content items inserted into the rich text. */
  linkedItems: ItemCollection;
};

export type RichTextAssetsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RichTextComponentsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RichTextItemHyperlinksArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RichTextLinkedItemsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RichTextAsset = AssetInterface & {
  __typename: "_RichTextAsset";
  /** The asset's alt text description for a specific language. */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The image's height in pixels. */
  height?: Maybe<Scalars["Int"]["output"]>;
  /** Identifier of the asset as used in the rich text element. */
  imageId: Scalars["String"]["output"];
  /** The asset's display name. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** The file's size in bytes. */
  size?: Maybe<Scalars["Int"]["output"]>;
  /** The file's MIME type. */
  type?: Maybe<Scalars["String"]["output"]>;
  /** The asset's absolute URL. */
  url: Scalars["String"]["output"];
  /** The image's width in pixels. */
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type RichTextAssetCollection = {
  __typename: "_RichTextAssetCollection";
  /** Individual asset objects. */
  items: Array<RichTextAsset>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type RootQuery = {
  __typename: "_RootQuery";
  article?: Maybe<Article>;
  article_All: ArticleAll;
  event?: Maybe<Event>;
  event_All: EventAll;
  landingPage?: Maybe<LandingPage>;
  landingPage_All: LandingPageAll;
  solution?: Maybe<Solution>;
  solution_All: SolutionAll;
  video?: Maybe<Video>;
  video_All: VideoAll;
};

export type RootQueryArticleArgs = {
  codename?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Guid"]["input"]>;
  languageFilter?: InputMaybe<LanguageFilter>;
};

export type RootQueryArticleAllArgs = {
  languageFilter?: InputMaybe<LanguageFilter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<ArticleOrder>;
  where?: InputMaybe<ArticleWhere>;
};

export type RootQueryEventArgs = {
  codename?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Guid"]["input"]>;
  languageFilter?: InputMaybe<LanguageFilter>;
};

export type RootQueryEventAllArgs = {
  languageFilter?: InputMaybe<LanguageFilter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<EventOrder>;
  where?: InputMaybe<EventWhere>;
};

export type RootQueryLandingPageArgs = {
  codename?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Guid"]["input"]>;
  languageFilter?: InputMaybe<LanguageFilter>;
};

export type RootQueryLandingPageAllArgs = {
  languageFilter?: InputMaybe<LanguageFilter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<LandingPageOrder>;
  where?: InputMaybe<LandingPageWhere>;
};

export type RootQuerySolutionArgs = {
  codename?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Guid"]["input"]>;
  languageFilter?: InputMaybe<LanguageFilter>;
};

export type RootQuerySolutionAllArgs = {
  languageFilter?: InputMaybe<LanguageFilter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<SolutionOrder>;
  where?: InputMaybe<SolutionWhere>;
};

export type RootQueryVideoArgs = {
  codename?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Guid"]["input"]>;
  languageFilter?: InputMaybe<LanguageFilter>;
};

export type RootQueryVideoAllArgs = {
  languageFilter?: InputMaybe<LanguageFilter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<VideoOrder>;
  where?: InputMaybe<VideoWhere>;
};

export type Sys = {
  __typename: "_Sys";
  /** The content item's codename. */
  codename: Scalars["String"]["output"];
  /** The content item's collection. For projects without collection enabled, the value is `default`. */
  collection: Collection;
  /** The content item's internal ID. */
  id: Scalars["Guid"]["output"];
  /** The language that the item's content is in. */
  language: Language;
  /** [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date and time (e.g. 2021-11-02T13:27:31Z) of the last change to user-content of the item. The value is not affected when changing workflow steps. */
  lastModified: Scalars["DateTime"]["output"];
  /** The content item's display name. */
  name: Scalars["String"]["output"];
  /** The content item's type. */
  type: ContentType;
  /** The content item's current workflow. */
  workflow: Workflow;
  /** The content item's current workflow step. */
  workflowStep: WorkflowStep;
};

/** Allows filtering based on system properties. */
export type SystemFilter = {
  /** The content item's codename. */
  codename?: InputMaybe<CodenameFilter>;
  /** The content item's collection. */
  collection?: InputMaybe<CodenameFilter>;
  /** The content item's internal ID. */
  id?: InputMaybe<IdFilter>;
  /** The content item's language. */
  language?: InputMaybe<SystemLanguageFilter>;
  /** The date and time of the last change to user-content of the item. The value is not affected when changing workflow steps. */
  lastModified?: InputMaybe<DateTimeFilter>;
  /** The content item's display name. */
  name?: InputMaybe<TextFilter>;
  /** The content item's current workflow. */
  workflow?: InputMaybe<CodenameFilter>;
  /** The content item's current workflow step. */
  workflowStep?: InputMaybe<CodenameFilter>;
};

/** Allows filtering based on language. */
export type SystemLanguageFilter = {
  _system_?: InputMaybe<SystemLanguageSystemFilter>;
};

/** Allows filtering based on language's system properties. */
export type SystemLanguageSystemFilter = {
  /** The language's codename. */
  codename?: InputMaybe<CodenameFilter>;
};

/** Allows ordering based on system properties. */
export type SystemOrder = {
  /** The content item's codename. */
  codename?: InputMaybe<OrderEnum>;
  /** The date and time of the last change to user-content of the item. The value is not affected when changing workflow steps. */
  lastModified?: InputMaybe<OrderEnum>;
  /** The content item's display name. */
  name?: InputMaybe<OrderEnum>;
};

export type TaxonomyTerm = {
  __typename: "_TaxonomyTerm";
  /** The taxonomy term's predefined system fields. */
  _system_: TaxonomyTermSys;
};

export type TaxonomyTermCollection = {
  __typename: "_TaxonomyTermCollection";
  /** Individual taxonomy term objects. */
  items: Array<TaxonomyTerm>;
  /** Specifies the number of items to retrieve. If not specified, the API returns a maximum of 10 objects. */
  limit: Scalars["Int"]["output"];
  /** Specifies the number of objects to skip. If not specified, the API returns the first page of results. */
  offset: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type TaxonomyTermSys = {
  __typename: "_TaxonomyTermSys";
  /** The taxonomy term's codename. */
  codename: Scalars["String"]["output"];
  /** The taxonomy term's display name. */
  name: Scalars["String"]["output"];
};

export type TextFilter = {
  /** Checks if the field value matches exactly to the specified filter value. */
  eq?: InputMaybe<Scalars["String"]["input"]>;
  /** Checks if the field value matches at least one of the specified array values. */
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Checks if the field value is an empty string. */
  isEmpty?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Checks if the field value is different than the specified value. */
  notEq?: InputMaybe<Scalars["String"]["input"]>;
  /** Checks if the field value is different than the specified array values. */
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type Workflow = {
  __typename: "_Workflow";
  /** The workflow's predefined system fields. */
  _system_: WorkflowSys;
};

export type WorkflowStep = {
  __typename: "_WorkflowStep";
  /** The workflow step's predefined system fields. */
  _system_: WorkflowStepSys;
};

export type WorkflowStepSys = {
  __typename: "_WorkflowStepSys";
  /** The workflow step's codename. */
  codename: Scalars["String"]["output"];
};

export type WorkflowSys = {
  __typename: "_WorkflowSys";
  /** The workflow's codename. */
  codename: Scalars["String"]["output"];
};

export type ArticleFragment = {
  __typename: "Article";
  title: string;
  introduction: string;
  _system_: { __typename: "_Sys"; id: string; codename: string };
  bodyCopy: { __typename: "_RichText"; html: string };
  publishDate_with_timezone?:
    | { __typename: "_DateAndTime"; display_timezone?: string | null; value?: string | null }
    | null;
  image: {
    __typename: "_AssetCollection";
    items: Array<
      {
        __typename: "_Asset";
        url: string;
        description?: string | null;
        width?: number | null;
        height?: number | null;
        type?: string | null;
        size?: number | null;
      }
    >;
  };
};

export type AssetFragment = {
  __typename: "_Asset";
  url: string;
  description?: string | null;
  width?: number | null;
  height?: number | null;
  type?: string | null;
  size?: number | null;
};

export type EventFragment = {
  __typename: "Event";
  name: string;
  _system_: { __typename: "_Sys"; id: string; codename: string };
  description: { __typename: "_RichText"; html: string };
  startDate_with_timezone?:
    | { __typename: "_DateAndTime"; display_timezone?: string | null; value?: string | null }
    | null;
  image: {
    __typename: "_AssetCollection";
    items: Array<
      {
        __typename: "_Asset";
        url: string;
        description?: string | null;
        width?: number | null;
        height?: number | null;
        type?: string | null;
        size?: number | null;
      }
    >;
  };
  eventTopic: {
    __typename: "_TaxonomyTermCollection";
    items: Array<
      { __typename: "_TaxonomyTerm"; _system_: { __typename: "_TaxonomyTermSys"; codename: string; name: string } }
    >;
  };
  eventType: {
    __typename: "_TaxonomyTermCollection";
    items: Array<
      { __typename: "_TaxonomyTerm"; _system_: { __typename: "_TaxonomyTermSys"; codename: string; name: string } }
    >;
  };
  endDate_with_timezone?:
    | { __typename: "_DateAndTime"; display_timezone?: string | null; value?: string | null }
    | null;
};

export type VideoFragment = {
  __typename: "Video";
  headline: string;
  description: string;
  videoLink: string;
  caption: string;
  _system_: { __typename: "_Sys"; id: string; codename: string };
  autoplay: {
    __typename: "_MultipleChoiceOptionCollection";
    items: Array<
      {
        __typename: "_MultipleChoiceOption";
        _system_: { __typename: "_MultipleChoiceOptionSys"; codename: string; name: string };
      }
    >;
  };
};

export type GetLandingPageQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetLandingPageQueryQuery = {
  __typename: "_RootQuery";
  landingPage_All: {
    __typename: "LandingPage_All";
    items: Array<
      {
        __typename: "LandingPage";
        headline: string;
        subheadline: string;
        _system_: { __typename: "_Sys"; id: string; name: string; codename: string };
        heroImage: {
          __typename: "_AssetCollection";
          items: Array<
            {
              __typename: "_Asset";
              url: string;
              description?: string | null;
              width?: number | null;
              height?: number | null;
              type?: string | null;
              size?: number | null;
            }
          >;
        };
        bodyCopy: {
          __typename: "LandingPage_BodyCopy";
          html: string;
          components: {
            __typename: "LandingPage_BodyCopy_Components_Collection";
            items: Array<
              {
                __typename: "Video";
                headline: string;
                description: string;
                videoLink: string;
                caption: string;
                _system_: { __typename: "_Sys"; id: string; codename: string };
                autoplay: {
                  __typename: "_MultipleChoiceOptionCollection";
                  items: Array<
                    {
                      __typename: "_MultipleChoiceOption";
                      _system_: { __typename: "_MultipleChoiceOptionSys"; codename: string; name: string };
                    }
                  >;
                };
              }
            >;
          };
        };
        featuredContent: {
          __typename: "LandingPage_FeaturedContent_Collection";
          items: Array<
            {
              __typename: "Article";
              title: string;
              introduction: string;
              _system_: { __typename: "_Sys"; id: string; codename: string };
              bodyCopy: { __typename: "_RichText"; html: string };
              publishDate_with_timezone?: {
                __typename: "_DateAndTime";
                display_timezone?: string | null;
                value?: string | null;
              } | null;
              image: {
                __typename: "_AssetCollection";
                items: Array<
                  {
                    __typename: "_Asset";
                    url: string;
                    description?: string | null;
                    width?: number | null;
                    height?: number | null;
                    type?: string | null;
                    size?: number | null;
                  }
                >;
              };
            } | {
              __typename: "Event";
              name: string;
              _system_: { __typename: "_Sys"; id: string; codename: string };
              description: { __typename: "_RichText"; html: string };
              startDate_with_timezone?: {
                __typename: "_DateAndTime";
                display_timezone?: string | null;
                value?: string | null;
              } | null;
              image: {
                __typename: "_AssetCollection";
                items: Array<
                  {
                    __typename: "_Asset";
                    url: string;
                    description?: string | null;
                    width?: number | null;
                    height?: number | null;
                    type?: string | null;
                    size?: number | null;
                  }
                >;
              };
              eventTopic: {
                __typename: "_TaxonomyTermCollection";
                items: Array<
                  {
                    __typename: "_TaxonomyTerm";
                    _system_: { __typename: "_TaxonomyTermSys"; codename: string; name: string };
                  }
                >;
              };
              eventType: {
                __typename: "_TaxonomyTermCollection";
                items: Array<
                  {
                    __typename: "_TaxonomyTerm";
                    _system_: { __typename: "_TaxonomyTermSys"; codename: string; name: string };
                  }
                >;
              };
              endDate_with_timezone?: {
                __typename: "_DateAndTime";
                display_timezone?: string | null;
                value?: string | null;
              } | null;
            }
          >;
        };
      }
    >;
  };
};

export class TypedDocumentString<TResult, TVariables> extends String
  implements DocumentTypeDecoration<TResult, TVariables> {
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>["__apiType"]>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const AssetFragmentDoc = new TypedDocumentString(
  `
    fragment Asset on _Asset {
  url
  description
  width
  height
  type
  size
}
    `,
  { fragmentName: "Asset" },
) as unknown as TypedDocumentString<AssetFragment, unknown>;
export const ArticleFragmentDoc = new TypedDocumentString(
  `
    fragment Article on Article {
  __typename
  _system_ {
    id
    codename
  }
  title
  introduction
  bodyCopy {
    html
  }
  publishDate_with_timezone {
    display_timezone
    value
  }
  image {
    items {
      ...Asset
    }
  }
}
    fragment Asset on _Asset {
  url
  description
  width
  height
  type
  size
}`,
  { fragmentName: "Article" },
) as unknown as TypedDocumentString<ArticleFragment, unknown>;
export const EventFragmentDoc = new TypedDocumentString(
  `
    fragment Event on Event {
  __typename
  _system_ {
    id
    codename
  }
  name
  description {
    html
  }
  startDate_with_timezone {
    display_timezone
    value
  }
  image {
    items {
      ...Asset
    }
  }
  eventTopic {
    items {
      _system_ {
        codename
        name
      }
    }
  }
  eventType {
    items {
      _system_ {
        codename
        name
      }
    }
  }
  endDate_with_timezone {
    display_timezone
    value
  }
}
    fragment Asset on _Asset {
  url
  description
  width
  height
  type
  size
}`,
  { fragmentName: "Event" },
) as unknown as TypedDocumentString<EventFragment, unknown>;
export const VideoFragmentDoc = new TypedDocumentString(
  `
    fragment Video on Video {
  _system_ {
    id
    codename
  }
  headline
  description
  videoLink
  caption
  autoplay {
    items {
      _system_ {
        codename
        name
      }
    }
  }
}
    `,
  { fragmentName: "Video" },
) as unknown as TypedDocumentString<VideoFragment, unknown>;
export const GetLandingPageQueryDocument = new TypedDocumentString(`
    query GetLandingPageQuery {
  landingPage_All(limit: 1) {
    items {
      _system_ {
        id
        name
        codename
      }
      headline
      subheadline
      heroImage {
        items {
          ...Asset
        }
      }
      bodyCopy {
        html
        components {
          items {
            ...Video
          }
        }
      }
      featuredContent {
        items {
          ... on Event {
            ...Event
          }
          ... on Article {
            ...Article
          }
        }
      }
    }
  }
}
    fragment Article on Article {
  __typename
  _system_ {
    id
    codename
  }
  title
  introduction
  bodyCopy {
    html
  }
  publishDate_with_timezone {
    display_timezone
    value
  }
  image {
    items {
      ...Asset
    }
  }
}
fragment Asset on _Asset {
  url
  description
  width
  height
  type
  size
}
fragment Event on Event {
  __typename
  _system_ {
    id
    codename
  }
  name
  description {
    html
  }
  startDate_with_timezone {
    display_timezone
    value
  }
  image {
    items {
      ...Asset
    }
  }
  eventTopic {
    items {
      _system_ {
        codename
        name
      }
    }
  }
  eventType {
    items {
      _system_ {
        codename
        name
      }
    }
  }
  endDate_with_timezone {
    display_timezone
    value
  }
}
fragment Video on Video {
  _system_ {
    id
    codename
  }
  headline
  description
  videoLink
  caption
  autoplay {
    items {
      _system_ {
        codename
        name
      }
    }
  }
}`) as unknown as TypedDocumentString<GetLandingPageQueryQuery, GetLandingPageQueryQueryVariables>;

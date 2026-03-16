import type { RouteConfig } from "../../route-types";

import { AccordionShowcasePage } from "./accordion";
import { AlertDialogShowcasePage } from "./alert-dialog";
import { AvatarShowcasePage } from "./avatar";
import { BadgeShowcasePage } from "./badge";
import { BreadcrumbShowcasePage } from "./breadcrumb";
import { ButtonShowcasePage } from "./button";
import { CenterShowcasePage } from "./center";
import { CheckboxShowcasePage } from "./checkbox";
import { CollapsibleShowcasePage } from "./collapsible";
import { ContainerShowcasePage } from "./container";
import { DialogShowcasePage } from "./dialog";
import { DismissableLayerShowcasePage } from "./dismissable-layer";
import { DropdownMenuShowcasePage } from "./dropdown-menu";
import { FieldShowcasePage } from "./field";
import { FocusRingShowcasePage } from "./focus-ring";
import { FocusScopeShowcasePage } from "./focus-scope";
import { GridShowcasePage } from "./grid";
import { InlineShowcasePage } from "./inline";
import { InputShowcasePage } from "./input";
import { LabelShowcasePage } from "./label";
import { MenuShowcasePage } from "./menu";
import { MenubarShowcasePage } from "./menubar";
import { NavigationMenuShowcasePage } from "./navigation-menu";
import { PaginationShowcasePage } from "./pagination";
import { PopoverShowcasePage } from "./popover";
import { ProgressShowcasePage } from "./progress";
import { ProgressCircleShowcasePage } from "./progress-circle";
import { RadioGroupShowcasePage } from "./radio-group";
import { SelectShowcasePage } from "./select";
import { SeparatorShowcasePage } from "./separator";
import { SidebarLayoutShowcasePage } from "./sidebar-layout";
import { SkeletonShowcasePage } from "./skeleton";
import { SliderShowcasePage } from "./slider";
import { SpacerShowcasePage } from "./spacer";
import { SpinnerShowcasePage } from "./spinner";
import { StackShowcasePage } from "./stack";
import { SwitchShowcasePage } from "./switch";
import { TabsShowcasePage } from "./tabs";
import { TextareaShowcasePage } from "./textarea";
import { ToastShowcasePage } from "./toast";
import { ToggleShowcasePage } from "./toggle";
import { ToggleGroupShowcasePage } from "./toggle-group";
import { TooltipShowcasePage } from "./tooltip";
import { TopbarLayoutShowcasePage } from "./topbar-layout";
import { VisuallyHiddenShowcasePage } from "./visually-hidden";

export const uiComponentRoutes: RouteConfig[] = [
  { path: "/showcase/ui/accordion", component: AccordionShowcasePage },
  { path: "/showcase/ui/alert-dialog", component: AlertDialogShowcasePage },
  { path: "/showcase/ui/avatar", component: AvatarShowcasePage },
  { path: "/showcase/ui/badge", component: BadgeShowcasePage },
  { path: "/showcase/ui/breadcrumb", component: BreadcrumbShowcasePage },
  { path: "/showcase/ui/button", component: ButtonShowcasePage },
  { path: "/showcase/ui/center", component: CenterShowcasePage },
  { path: "/showcase/ui/checkbox", component: CheckboxShowcasePage },
  { path: "/showcase/ui/collapsible", component: CollapsibleShowcasePage },
  { path: "/showcase/ui/container", component: ContainerShowcasePage },
  { path: "/showcase/ui/dialog", component: DialogShowcasePage },
  {
    path: "/showcase/ui/dismissable-layer",
    component: DismissableLayerShowcasePage,
  },
  { path: "/showcase/ui/dropdown-menu", component: DropdownMenuShowcasePage },
  { path: "/showcase/ui/field", component: FieldShowcasePage },
  { path: "/showcase/ui/focus-ring", component: FocusRingShowcasePage },
  { path: "/showcase/ui/focus-scope", component: FocusScopeShowcasePage },
  { path: "/showcase/ui/grid", component: GridShowcasePage },
  { path: "/showcase/ui/inline", component: InlineShowcasePage },
  { path: "/showcase/ui/input", component: InputShowcasePage },
  { path: "/showcase/ui/label", component: LabelShowcasePage },
  { path: "/showcase/ui/menu", component: MenuShowcasePage },
  { path: "/showcase/ui/menubar", component: MenubarShowcasePage },
  {
    path: "/showcase/ui/navigation-menu",
    component: NavigationMenuShowcasePage,
  },
  { path: "/showcase/ui/pagination", component: PaginationShowcasePage },
  { path: "/showcase/ui/popover", component: PopoverShowcasePage },
  { path: "/showcase/ui/progress", component: ProgressShowcasePage },
  {
    path: "/showcase/ui/progress-circle",
    component: ProgressCircleShowcasePage,
  },
  { path: "/showcase/ui/radio-group", component: RadioGroupShowcasePage },
  { path: "/showcase/ui/select", component: SelectShowcasePage },
  { path: "/showcase/ui/separator", component: SeparatorShowcasePage },
  { path: "/showcase/ui/sidebar-layout", component: SidebarLayoutShowcasePage },
  { path: "/showcase/ui/skeleton", component: SkeletonShowcasePage },
  { path: "/showcase/ui/slider", component: SliderShowcasePage },
  { path: "/showcase/ui/spacer", component: SpacerShowcasePage },
  { path: "/showcase/ui/spinner", component: SpinnerShowcasePage },
  { path: "/showcase/ui/stack", component: StackShowcasePage },
  { path: "/showcase/ui/switch", component: SwitchShowcasePage },
  { path: "/showcase/ui/tabs", component: TabsShowcasePage },
  { path: "/showcase/ui/textarea", component: TextareaShowcasePage },
  { path: "/showcase/ui/toast", component: ToastShowcasePage },
  { path: "/showcase/ui/toggle", component: ToggleShowcasePage },
  { path: "/showcase/ui/toggle-group", component: ToggleGroupShowcasePage },
  { path: "/showcase/ui/tooltip", component: TooltipShowcasePage },
  { path: "/showcase/ui/topbar-layout", component: TopbarLayoutShowcasePage },
  {
    path: "/showcase/ui/visually-hidden",
    component: VisuallyHiddenShowcasePage,
  },
];

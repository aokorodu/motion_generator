import "./style.scss";
import { App } from './app';
import { SettingButtonComponet } from './setting-button-component';
import { SettingTitleComponent} from './setting-title-component';
import { SettingSubtitleComponent} from './setting-subtitle-component';
import { MotionTargetComponent } from './motion-target-component';
import { DistanceComponent } from './distance-component';
import { ScaleComponent } from './scale-component';
import { ImageComponent } from './image-component';
import { MotionChartComponent } from './motion-chart-component';
import { ScaleDistanceComponent } from './scale-distance-component';

console.log('hello world');

const app = new App();
app.init();
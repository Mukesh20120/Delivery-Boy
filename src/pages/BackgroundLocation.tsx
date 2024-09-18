import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonToggle,
  IonItemDivider,
  IonLabel
} from '@ionic/react';

import React from "react";

import BackgroundGeolocation, {
  Subscription
} from "@transistorsoft/capacitor-background-geolocation";

const BackgroundLocation: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const [events, setEvents] = React.useState<any[]>([]);

  const addEvent = (name: string, event:any) => {
    setEvents(previous => [...previous, {
      name: name,
      json: JSON.stringify(event, null, 2)
    }]);
  }

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation:Subscription = BackgroundGeolocation.onLocation((location) => {
      addEvent('onLocation', location);
    })

    const onMotionChange:Subscription = BackgroundGeolocation.onMotionChange((event) => {
      addEvent('onMotionChange', event);
    });

    const onActivityChange:Subscription = BackgroundGeolocation.onActivityChange((event) => {
      addEvent('onActivityChange', event);
    })

    const onProviderChange:Subscription = BackgroundGeolocation.onProviderChange((event) => {
      addEvent('onProviderChange', event);
    })

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    }).then((state) => {
      setReady(true);
      setEnabled(state.enabled)
      addEvent('State', state);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    }
  }, []);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (!ready) { return }

    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setEvents([]);
    }
  }, [enabled]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonLabel>Toggle to <code>{(enabled ? 'stop()' : 'start()')}</code> &mdash;&gt;</IonLabel>
            <IonToggle checked={enabled} onIonChange={e => setEnabled(e.detail.checked)}/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{padding:10}}>
        { events.slice().reverse().map((event, i) => (
          <div key={i}>
            <p><strong>{event.name}</strong></p>
            <small><pre><code>{event.json}</code></pre></small>
            <IonItemDivider />
          </div>
        ))}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default BackgroundLocation;
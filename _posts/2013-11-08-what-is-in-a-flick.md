---

layout: blog
title: What's in a Flick?
author: António Afonso
author_url: https://github.com/aadsm

---

### Differentiating between a User's Drag and Scroll Intentions

If you make a living building HTML5 mobile apps, you've probably come across this common user interface challenge: a vertical (or horizontal) slider inside a scrollable area.

Most web frameworks know how to respond when users move or "flick" their fingers up or down on a slider knob. What if a user's intention is not to move the slider, however? What if the user accidentally touches the slider knob when all he or she wants is scroll through the content area?

Based on our observations, we've always thought that flick gestures are slightly different depending on the user's intention. If the intention is to move a slider, users typically act more carefully and thoughtfully—that is, they take a bit more time—to ensure the flick is initiated on the exact spot of the slider knob. By contrast, when the intention is to scroll, users are less careful and quickly swipe their fingers anywhere on the screen, slider presence be damned. However, these were just our observations; we wanted proof that not all flicks are equal. So we built a simple app with a slider that enabled us to log flick timings. The goal was to see if a pattern emerges that would help us recognize whether the intent is to drag or scroll based on the initial move of a user's finger.

The application uses our [TranslateComposer](http://montagejs.org/api/TranslateComposer.html), which is part of the core MontageJS framework. The TranslateComposer abstracts the input method (touch or mouse) into a layer of `translate` events. It also eliminates the need for writing a bunch of code that simulates scrolling behavior (e.g., momentum scroller effect) and ensures that the same UI decisions are applied for every component. Since the TranslateComposer is accessible to any component, we thought it might be a good starting point to try to validate our observations. Our hope was that the composer would allow us to calculate the velocity of the flick. But, as happens so often, there was a caveat: we could only evaluate the `touchstart` and the first `touchmove` events to decide which component—the scroller or the slider—should receive the translate events. Using more events would have provided more data, but it also would have made the application less responsive in the eyes of the user.

The first iteration of our tool plotted the `touchstart` and `touchmove` events in a time-pixel graph when a user flicked his or her finger on a static slider (see Figure 1).

<figure>
	<img src="/images/blog/flick-fig01a-sc.png" alt="Scroll test">
	<img src="/images/blog/flick-fig01b-sl.png" alt="Slider test">
	<figcaption>Figure 1. Scroll text (top) and slider test (bottom).</figcaption>
</figure>

Based on this simple representation alone, we were able to see a noticeable difference in the duration between the `touchstart` and the `touchmove` events depending on the scroll or drag intention. But it wasn't enough to interpret the user's intention with certainty. So we decided to modify our tool: we made the left side a vertical scrollable area with vertical sliders (see Figure 2). We also tracked the difference in milliseconds between the `touchstart` event and first `touchmove` event.

<figure>
	<img src="/images/blog/flick-fig02a-sc.png" alt="Scroll test">
	<img src="/images/blog/flick-fig02b-sl.png" alt="Scroll test">
	<figcaption>Figure 2. Scroll test (top) and slider test (bottom).</figcaption>
</figure>

Even though we had measurable results, we still were not sure how to interpret them or what the ideal delta between events should be. We decided to add a logging function to our tool to help us gauge the average interval for each intention. We also added a button, so users could tell the tool the original intention after each flick (see Figure 3).

<figure>
	<img src="/images/blog/flick-fig03.png" alt="Scroll test">
	<figcaption>Figure 3. Test with logging function.</figcaption>
</figure>

Since there were some discrete (if not odd) values—were they the result of awkward, weird, or bad flicks or noise?—simply taking the average of the durations between events was not sufficient to help us distinguish between flicks. We decided to plot a line where the min and max values were based on the standard deviation of the lower values and the upper values (see Figure 4). The more input our tool received the more fit the lines became. The value to use is the center of the gap between the two lines.

<figure>
	<img src="/images/blog/flick-fig04.png" alt="Scroll test">
	<figcaption>Figure 4. Our final “test suite.”</figcaption>
</figure>

To confirm the accuracy of our final results, we decided to input the calculated value into the TranslateComposer system every time the value was recalculated: Now, each time we feed the tool with new data, the TranslateComposer is updated automatically with the new value and we can immediately test the results on the group of sliders in the scrollable area on the left until we are happy with the performance.

Aside from satisfying our curiosity about how to interpret the flick of a finger, the tool also has the benefit of helping us quickly calculate the perfect value to distinguish between scroll and drag intentions based on potential device-dependent timing differences (see, for example, Agawi's <a href="http://http://venturebeat.com/2013/09/19/apples-iphone-5-touchscreen-is-2-5-times-faster-than-android-devices/" target="_blank">TouchMarks benchmark test</a>). All we have to do is load the tool in the browser and play with it for a few seconds to get the best value for the current device/browser combination.

We currently run the tool on two different devices and found different optimum values for each one: On the iPad (iOS 6), the optimum value is 127.5 ms; on the Nexus 10 (Android 4.2.2), it is 153.5 ms. (See for yourself with <a href="/blog/2013-11-08-what-is-in-a-flick/" target="_blank">this list of sliders</a> which is a mockup of our tests: text your scroll or slide intentions with this list.)

Bottom line, the more responsive the application the better the user experience—which is why the Montage team spends so much time and effort making sure our components and the technology behind them are as good as they can be.
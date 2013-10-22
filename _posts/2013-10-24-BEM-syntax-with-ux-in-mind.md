---

layout: blog
title: A BEM syntax with UX in mind
author: simurai
author_url: https://github.com/simurai
published: false

---

At some point, while working on the MontageJS framework, the question came up what kind of CSS naming convention we should start using. After a [long discussion](https://github.com/montagejs/montage/issues/795) we settled on using the [BEM mythology](http://bem.info/method/definitions/), but changed the syntax a bit. Now to keep this post short, I'm not gonna go into why using BEM in a good idea, but rather gonna explain why we choose a different syntax. But first let’s look at some examples:

```css
.digit-Progress          /* package-Component */
.digit-Progress-bar      /* package-Component-childElement */
.digit-Progress--small   /* package-Component--variation */
```

> Note: The `package-` (digit-) prefix is used as a name-space so it wouldn't conflict with other packages/libraries/frameworks.

Now let's take a look at the reasons for choosing a syntax like that.

### Hyphens (-)
Rule #1 and the main reason why we're using a hyphen (-) instead of a underscores (_), has to do with the fact that their behavior is different when __double clicking__ to select the text. Try it out here:

```css
component__element /* underscores */
component-element  /* hyphen */
```

![naming-conventions-1](/images/blog/naming-conventions-1.gif)

See how when you're using underscores it selects the part before and after, in this case the whole `component__element`. But with hyphens it let's you select only the part you double clicked on. `component` __OR__ `element`. This let's you quickly edit only the parts you want:

![naming-conventions-2](/images/blog/naming-conventions-2.gif)

### camelCase
Now what if the component or child element have multiple words? We could use underscores like `component_name-element_name`. It would still be double-clickable, but somehow readability suffers since it's harder to see what belongs together. Better to use __camelCase__ which groups each part visually more together: `componentName-elementName`.

### MainComponent
OK, I think we're getting closer. As a last rule, for the "main" component we use `CamelCase`. The reason for it is to add __more emphasis__ and make it easier to spot what the main component is and what "just" a child element. Also when using a namespace, the component moves to the second position, which makes it even more important to make it stick out more: `package-Component-childElement`

### --variation
We kept the otherwise more commonly used double hyphens (--) for __variations__. `digit-Progress--small`. It makes somewhat sense, because it pulls the variation (--small) visually more apart and makes it look like it's something "different" than an actual element.

-------------

So that's about it. For more details, you can head over to the CSS part of our [naming conventions](http://montagejs.org/docs/naming-conventions.html#toc_3) or take a look at the [SUIT framework](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) which started to use the same syntax and documented it really well.

In the end, whatever [Shade of BEM](http://blog.kaelig.fr/post/48196348743/fifty-shades-of-bem) you choose to cook with probably depends on your personal taste, but thinking about a great UX by improving usability and readability shouldn't hurt either.

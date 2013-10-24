---

layout: blog
title: A BEM syntax with UX in mind
author: simurai
author_url: https://github.com/simurai

---

At some point, while working on the MontageJS framework, the question came up what CSS naming convention we should start using. After a [long discussion](https://github.com/montagejs/montage/issues/795) we settled on using the [BEM methodology](http://bem.info/method/definitions/), but changed the syntax a bit. To keep this post short, I won't go into detail why using BEM is a good idea, but rather explain why we chose a different syntax. But first let’s look at some examples:

```css
.digit-Progress          /* package-Component */
.digit-Progress-bar      /* package-Component-childElement */
.digit-Progress--small   /* package-Component--variation */
```

> Note: The `package-` (digit-) prefix is used as a name-space so it wouldn't conflict with other packages/libraries/frameworks.

Now let's take a look at the reasons for choosing this syntax.

### Hyphens (-)
The main reason why we're using a hyphen (`-`) instead of underscores (`_`), has to do with the fact that their behavior is different when __double-clicking__ to select text. Try for yourself:

```css
component__element /* underscores */
component-element  /* hyphen */
```

![naming-conventions-1](/images/blog/naming-conventions-1.gif)

See how when you're using underscores it selects the part before and after, in this case the whole `component__element`. But with hyphens it let's you select only the part you double-clicked. `component` __OR__ `element`. This let's you quickly edit only the parts you want:

![naming-conventions-2](/images/blog/naming-conventions-2.gif)

### camelCase
Now what if the component or child element consists of multiple words? We could use underscores like `component_name-element_name`. It would still be double-clickable, but readability suffers since it's harder to see what belongs together. Better to use __camelCase__ which groups each part visually: `componentName-elementName`.

### MainComponent
OK, I think we're getting closer. As a last rule, for the "main" component we use `CamelCase`. The reason for it is to add __emphasis__ and make it easier to distinguish the main component from a child element. Also when using a namespace, the component moves to the second position, which makes it even more important to have it stick out: `package-Component-childElement`

### --variation
We kept the more commonly used double hyphens (--) for __variations__. `digit-Progress--small`. It makes sense, because it pulls the variation (--small) visually more apart and makes it look like it's something "different" than an actual element.

-------------

So that's about it. For more details, you can read up on the CSS part of our [naming conventions](http://montagejs.org/docs/naming-conventions.html#toc_3) or take a look at [SUIT framework](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md), which started to use the same syntax and documented it really well.

In the end, whatever [Shade of BEM](http://blog.kaelig.fr/post/48196348743/fifty-shades-of-bem) you choose to cook with probably depends on your personal taste, but thinking about a great UX by improving usability and readability won't hurt either.

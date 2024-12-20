---
layout: ../../../../../layouts/post.astro
title: "Format all the things"
description: "How we set up prettier for 6play"
author: f_lepretre 
category:
tags: [prettier, javascript, react, lint, eslint, 6play]
feature-img: "./military.jpg"
thumbnail: "./military.jpg"
comments: true
language: en
---

## Prettier

[Prettier](https://github.com/prettier/prettier) is a brand new javascript library. Its simple goal is to reformat your code. For instance, when I write this:
<script src="https://gist.github.com/flepretre/dcc564b045b204c7a2e184c8151ddfa0.js"></script>

and run prettier on it, I'll ultimately get this:
<script src="https://gist.github.com/flepretre/5a18257706027651d7c38c1b2504f8a7.js"></script>

You can try it for yourself at [prettier’s website](https://prettier.github.io/prettier/#%7B%22content%22%3A%22import%20React%2C%20%7B%20Component%20%20%7D%20from%20'react'%3B%5Cn%5Cnexport%20default%5Cnclass%20Prettier%20extends%20Component%5Cn%7B%5Cn%20%20render%20()%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%3Cdiv%20className%3D%5C%22prettier%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Ch1%3EAbout%20Prettier%3C%2Fh1%3E%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3EPrettier%20is%20gonna%20format%20all%20the%20things%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20I%20don't%20need%20to%20be%20a%20stylish%20developer%20anymore%20%3Awink%3A%5Cn%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%3C%2Fdiv%3E%5Cn%20%20%20%20)%5Cn%20%20%7D%5Cn%7D%5Cn%22%2C%22options%22%3A%7B%22printWidth%22%3A120%2C%22tabWidth%22%3A2%2C%22singleQuote%22%3Afalse%2C%22trailingComma%22%3A%22all%22%2C%22bracketSpacing%22%3Afalse%2C%22jsxBracketSameLine%22%3Afalse%2C%22parser%22%3A%22babylon%22%2C%22doc%22%3Afalse%7D%7D)

Looks awesome doesn't it? You don't need to be a stylish developer anymore! But let’s be honest: not all developers are enthusiastic about this new tool. There are two kinds of developers, those who like when a program helps them to format their code, and those who don't.

There *are* some benefits: using prettier you won't waste your time reformatting your code because your destructuring expression overreaches your config's character cap. You will no longer have conflicts because your colleagues changed indentation on the code you're currently working on.

But it also comes with some tradeoffs. The first one is your coding style. We generally add line breaks between chained calls on an API (example [here](https://prettier.github.io/prettier/#%7B%22content%22%3A%22const%20renderPlayground%20%3D%20extraConfiguration%20%3D%3E%20%7B%5Cn%20%20store.dispatch(%5Cn%20%20%20%20settingsChange(%5Cn%20%20%20%20%20%20getPlaygroundBaseConfiguration(%5Cn%20%20%20%20%20%20%20%20merge(extraConfiguration%2C%20urlConfiguration)%5Cn%20%20%20%20%20%20)%5Cn%20%20%20%20)%5Cn%20%20)%3B%5Cn%7D%3B%5Cn%22%2C%22options%22%3A%7B%22printWidth%22%3A120%2C%22tabWidth%22%3A2%2C%22singleQuote%22%3Atrue%2C%22trailingComma%22%3A%22none%22%2C%22bracketSpacing%22%3Atrue%2C%22jsxBracketSameLine%22%3Afalse%2C%22parser%22%3A%22babylon%22%2C%22doc%22%3Afalse%7D%7D)). Prettier will make this fit on one line if it can, and your code will lose some clarity. The same thing goes with the parentheses you add in complex boolean operations (example [here](https://prettier.github.io/prettier/#%7B%22content%22%3A%22export%20const%20mustRefresh%20%3D%20(%7Bapplaunch%3A%20%7BlastCheck%2C%20applaunchConfig%20%3D%20%7B%7D%7D%7D)%20%3D%3E%5Cn%20%20!lastCheck%20%7C%7C%20(moment().valueOf()%20-%20lastCheck%20%3E%20(applaunchConfig.maxAge%20%7C%7C%2015%20*%2060%20*%201000))%3B%22%2C%22options%22%3A%7B%22printWidth%22%3A120%2C%22tabWidth%22%3A2%2C%22singleQuote%22%3Atrue%2C%22trailingComma%22%3A%22none%22%2C%22bracketSpacing%22%3Atrue%2C%22jsxBracketSameLine%22%3Afalse%2C%22parser%22%3A%22babylon%22%2C%22doc%22%3Afalse%7D%7D)). You *will* have to remember operator priorities.

For a relatively big project like ours, we prefer adding some consistency to our code in order to avoid wasting our time on solving conflicts, at the expense of losing a little bit of readability and style.

## How to configure it?

We already have eslint setup in our project with some rule tweaks. So for us, Prettier had to interface smoothly with eslint. Fortunately it comes with a bunch of useful plugins.

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier): this library disables all eslint rules that conflict with the Prettier formatting. Without it we would need to turn off those rules manually.
- [eslint-plugin-prettier](https://github.com/not-an-aardvark/eslint-plugin-prettier): this library includes Prettier proper formatting as an eslint rule. So if our code is not well formatted, eslint will throw errors. This is the most important plugin for us, as it makes the linting fail if the code is not well formatted. Formatting is now mandatory!
- [prettier-eslint](https://github.com/prettier/prettier-eslint) ([prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli)): this plugin just runs `prettier` followed by `eslint --fix` command. The CLI version allows us to use it from the command line.

With these libraries, we can format all our code base and apply Prettier and eslint rules.

## Migration

First we had to format the whole repository. This results in a pretty big PR, 670 modified files, +11700 -11113 changes... The implication is obvious: if you choose to use Prettier on your project, it had better be set up from the start.

Anyway, once this huge PR was merged, we had to rebase other PRs. You can see it coming: if your rewrite most of your code and rebase other changes on it, there is nearly no way you can avoid conflicts.
But in reality it's (almost) easier than it seems. Since all modifications were generated by Prettier, we can simply discard them and regenerate them after the rebase.

So, the first thing to do was to rebase on the parent of the format commit in order to resolve all conflicts that were not related to the formatting. To put it differently, we are sure that in next rebase conflicts will only be related to Prettier's changes.

{% highlight bash %}
git rebase 0404b07~
# where 0404b07 is the git hash of the format commit parent
{% endhighlight %}

After that, we rebased our branch on the “prettier” commit, and we asked git to automatically keep the conflicting changes from the branch and to discard those from Prettier.

{% highlight bash %}
git rebase 0404b07 -s recursive -X theirs
{% endhighlight %}

Then we just needed to re-run Prettier to reformat the rebased code. After this, branches were well formatted and could get back to their normal life-cycle.

## How does it work on daily basis?

First, adding the following scripts in the `package.json` file enables us to use prettier as a yarn (or npm) command.

<script src="https://gist.github.com/flepretre/1c5c66591c5ccfa065dbe401511f217a.js"></script>

The first line is used to format files provided as parameters and is used in a git pre-commit hook. The second line was there to format the whole codebase and should not be used anymore. This command takes around 1 minute to execute which is a little too long to be used in the development process. It’s more interesting to plug Prettier in our IDE and only format modified files.    

Even though we now enforce a machine-generated code style, everyone is still free to use their favorite IDE with any formatting and syntax settings they like.
Those using `atom` or `sublime-text` can use plugins for the save action (atom plugin [here](https://github.com/prettier/prettier-atom) with "ESLint Integration" checkbox and sublime-text plugin [here](https://github.com/TheSavior/ESLint-Formatter)). Every saved file will be automatically formatted by Prettier. This is clearly the most comfortable solution.

Those used to applying the format action in Webstorm will have to configure an external tool to do it. [Here](https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/) is a good article to help you setup an external tool if you are interested in this solution.

Finally we wrote a pre-commit hook and added it to our documentation. It automatically runs `prettier` on all added files from our javascript sources. [lint-stage](https://github.com/okonet/lint-staged) does the same, but we don’t want to force the whole team to use it. It’s clearly not necessary to run it twice, for those who have a save action which already runs Prettier.

Here's an example of our pre-commit hook:

{% highlight bash %}
git diff --name-only HEAD | grep -E "src/.*\.js.?$" | xargs yarn format
{% endhighlight %}

## In conclusion
Prettier is a new tool to add to your chain. Its role is to format the code for you in a very strict way. Thanks to a bunch of plugins that complement it, it also plays nicely with and applies `eslint` rules. Like we said, there are few sacrifices to make in terms of clarity, but it allows you to stop taking care of things that add no real value to the code you write. It also helps you to reduce meaningless conflicts and debates on "how we should write this". We plan to use it on all our javascript repositories, for greater consistency and good.

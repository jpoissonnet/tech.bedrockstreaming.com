---
layout: ../../../../../layouts/post.astro
title: "Symfony Live Paris 2017"
description: "Symfony Live Paris 2017"
author: [g_bouyge, f_desaintpern, b_viguier]
category:
tags: [symfony, symfony live]
feature-img: "./SfLive2017.jpg"
thumbnail: "./SfLive2017.jpg"
comments: true
language: en
---

In March we attended [Symfony Live Paris 2017](https://paris2017.live.symfony.com/speakers), and it was very interesting.
Here are some special feedbacks about some of our favorite talks.
![Cité Universitaire](CitéUniversitaire.jpg)

## Varnish tags and invalidation
### Speaker : Jérémy Derussé
### Description
Jérémy presented us how to host applications on an production environment on a Raspberry PI using varnish cache.
Today, the internet traffic and the number of unique visitors increase every days.
People imagines that we need strong hardware servers to be able to respond to this traffic.

The interesting part of this presentation was the way of how to better use the cache in front of our applications.
To be able to minimize the number of requests to the server by managing the cache duration
and being able to invalidate it on demand when a resource expire.

### How to tag and segment the cache
By tagging every resources by a unique id (`entityName_id` by example), you'll be able to invalidate later the cache linked to it.
You can simplify and automate this tagging by using event dispatcher and listen all entities creations / modifications. With
this solution you also centralize your code logic.

Cache tagging also helps you with caching / invalidating many-to-many relationships between content items.

### How to invalidate the cache
Jérémy showed us a very interesting interface, displaying the entity content, automatically refreshed when the backend needs to be called because of a cache invalidation.

Once a resource is modified and needs to be uncached, your backend needs to call the Varnish to purge the tag linked to
resources. Once again the [FOS HttpCache bundle](https://foshttpcachebundle.readthedocs.io/en/latest/reference/tag-handler.html) does it very well.

### Advantages / drawbacks 
Caching everything is fine, but it has limitations :
**Works well when :**
* You have mostly read access
* You have more cache hit than miss
* Your application is able to communicate with your cache servers

**Can be difficult when :**
* Operations are not atomic
* It's complexifying / slowing backend writes 

### Hosting on a Raspberry PI
Jérémy finally showed us an impressive demonstration of an application running on Raspberry PI.
**The configuration :** 
* Docker
    * MySQL
    * NGINX
    * PHP7-FPM
    * Varnish
    
**The results :**
* Number of calls with no caching handling : around 8 / secs
* Number of calls with varnish cache response : around 900 / secs
    * impressive !

### Resources
You can manipulate cache by using the FOSHttpCacheBundle : [https://github.com/FriendsOfSymfony/FOSHttpCacheBundle](https://github.com/FriendsOfSymfony/FOSHttpCacheBundle)

Link to the speaker presentation : [https://www.slideshare.net/JrmyDeruss/grce-aux-tags-varnish-jai-switch-ma-prod-sur-raspberry-pi](https://www.slideshare.net/JrmyDeruss/grce-aux-tags-varnish-jai-switch-ma-prod-sur-raspberry-pi)

## Everything a dev should know about Unicode
### Speaker : Nicolas Grekas
### Description

Nicolas Grekas made a talk about Unicode, from its origin to the latest advanced uses, and more precisely in the PHP ecosystem. He explained how utf8/16 works and the complexity of language management, especially the folding, graphs clusters, modifiers etc.

PHP doesn't natively handle the unicode #RIPphp6, so it is important to understand the specificities of utf8 in order to avoid some traps, especially concerning string length calculation, comparisons and insertions in database.

In order to manage the unicode, you must use the php functions of mbstring, iconv, graph and inttl. The "u" modifier allows the utf8 to be processed correctly for regular expressions. For MySQL, utf8_unicode_ci handles ligatures whereas utf8_general_ci does not handle them - but is therefore faster.

Concerning security and avoiding *typosquatting*, there is a list of confusable characters for filtering: [https://unicode.org/cldr/utility/confusables.jsp?a=6play&r=None](https://unicode.org/cldr/utility/confusables.jsp?a=6play&r=None)

This presentation was very interesting and very useful. Thank you Nicolas ;-)

### Resources
Link to the speaker presentation : [https://speakerdeck.com/nicolasgrekas/tout-ce-quun-dev-devrait-savoir-a-propos-dunicode](https://speakerdeck.com/nicolasgrekas/tout-ce-quun-dev-devrait-savoir-a-propos-dunicode)

## Performances optimisation with Php7
### Speaker: Julien Pauli
### Description

As usual, it was a real pleasure to listen Julien Pauli speaking about what's under the hood of Php7.
Everybody knows there is an actual performances gap between version 5 and 7, but this talk gave some clues to understand the technical reasons behind these major improvements.

First, Php compiler has been totally rewritten (yes, Php is compiled in opcode and [cached in opcache](https://php.net/manual/en/intro.opcache.php)).
Thanks to an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), the compiler really understands the analyzed code,
and lot of optimizations can be done at *compilation time* instead of *runtime*.
For example, all constant expressions (like `$a = 1024 * 2048`) are now computed once for all.
Of course, this compilation pass is now longer but it is exactly the reason why [opcache](https://php.net/manual/en/intro.opcache.php)
has been made, and why you should warm up your opcache during your scripts' deployment.
Julien also introduced the parameter [opcache.interned-strings-buffer](https://php.net/manual/en/opcache.configuration.php#ini.opcache.interned-strings-buffer),
used to configure [string interning](https://en.wikipedia.org/wiki/String_interning) in Php.
He advised to increase its default value (or at least to check relevance),
because even a minimal Symfony application contains a lot of huge DocBlocks (and then huge strings) so the default
value could be underestimated in some cases. Ready to benchmark! :)

We had also some interesting information about [packed arrays](https://blog.blackfire.io/php-7-performance-improvements-packed-arrays.html) optimisations,
and some string tips (`"$a - $b"` is better than `$a . ' - ' . $b` for example).
Then he gave a very good overview of all the efforts done on internal Php structures in order to optimize memory access,
CPU cycles… an impressive work!

To finish, we have now an (very) approximated date for Php8 release!! Not before 2020… be patient :)

### Resources

Link to the speaker presentation: [https://www.slideshare.net/jpauli/symfony-live-2017php7performances](https://www.slideshare.net/jpauli/symfony-live-2017php7performances)

Do not hesitate to visit Julien's blog: [https://jpauli.github.io/](https://jpauli.github.io/)

## And many more

We also liked :

* Blog posts about Symfony 4 here : [https://fabien.potencier.org/](https://fabien.potencier.org/)
* Micro-Services Symfony at Meetic: feedback after 2 years of redesign! [https://fr.slideshare.net/meeticTech/php-symfony-microservices-migration-meetictech](https://fr.slideshare.net/meeticTech/php-symfony-microservices-migration-meetictech)
* Introduction to CQRS and Event Sourcing: [https://www.slideshare.net/samuelroze/introduction-to-cqrs-and-event-sourcing-74061563](https://fr.slideshare.net/meeticTech/php-symfony-microservices-migration-meetictech)
* Web security: and if we continued to break everything? [https://github.com/ninsuo/slides](https://github.com/ninsuo/slides)

Yan can find most of the slides here: [https://joind.in/event/symfonylive-paris-2017/schedule/list](https://joind.in/event/symfonylive-paris-2017/schedule/list)

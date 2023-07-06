# Corrections

This plugin provides an editorial workflow for correction requests.

## Filters

Some data filters to change the plugins behavior from outside.

### Recipient suggestions

You can provide a list of recipient suggestions. These will be suggested in the Gutenberg UI.

```php
add_filter(
    \Palasthotel\WordPress\Corrections\Plugin::FILTER_RECIPIENT_SUGGESTIONS,
    function(array $suggestions){
        return ["recipient1@palasthotel.de", "recipient2@palasthote.de"];
    }
);
```

### Message Service

The default MessageService implementation will send an email to the recipient. A custom implementation can be provided by implementing the `\Palasthotel\WordPress\Corrections\Service\MessagingService` interface und using the filter.

```php
add_filter(
    \Palasthotel\WordPress\Corrections\Plugin::FILTER_MESSAGE_SERVICE,
    function(\Palasthotel\WordPress\Corrections\Service\MessagingService $service){
        return new MyMessageService();
    }
);
```

### Customize email message

If the default MessagingService is in use there are two hooks to change the emails content.

```php
add_filter(
    \Palasthotel\WordPress\Corrections\Plugin::FILTER_EMAIL_SUBJECT,
    function(string $subject, \Palasthotel\WordPress\Corrections\Model\Message $message){
        return "My Custom subject";
    }, 10, 2
);
add_filter(
    \Palasthotel\WordPress\Corrections\Plugin::FILTER_EMAIL_BODY,
    function(string $body, \Palasthotel\WordPress\Corrections\Model\Message $message){
        return "My Custom body";
    }, 10, 2
);
```

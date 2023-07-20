<?php declare(strict_types=1);

namespace Shopgate\WebcheckoutSW6\Subscribers;

use Shopgate\WebcheckoutSW6\Services\CustomerManager;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;

class SessionExtenderSubscriber implements EventSubscriberInterface
{
    use ShopgateDetectTrait;

    private CustomerManager $customerManager;
    private EntityRepository $entityRepository;

    public function __construct(CustomerManager $customerManager, EntityRepository $entityRepository)
    {
        $this->customerManager = $customerManager;
        $this->entityRepository = $entityRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [ControllerEvent::class => ['handleSession', 40]];
    }

    /**
     * Tries to extend sessions of the customer/guest if they expire
     */
    public function handleSession(ControllerEvent $event): void
    {
        $request = $event->getRequest();
        if (!$this->isShopgateApiCall($request)) {
            return;
        }
        // necessary evil because this event happens before argument resolving
        $context = Context::createDefaultContext();
        $salesChannel = $this->entityRepository->search(
            (new Criteria())->addFilter(new EqualsFilter('accessKey',
                $request->headers->get('sw-access-key'))), $context)->first();
        if (!$salesChannel) {
            return;
        }
        $token = $request->headers->get('sw-context-token');
        $this->customerManager->extendCustomerTokenLife($token, $salesChannel->getId());
    }
}

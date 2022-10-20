import datetime

from cache_model.models import CacheModel
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from preferences.utils import get_setting
from public_model.models import PublicModel
from sort_model.models import OrderModel
import datetime

from cache_model.models import CacheModel
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from preferences.utils import get_setting
from public_model.models import PublicModel
from sort_model.models import OrderModel

SHORT_VALUE_LENGTH = 100


def get_subscription_date_end():
    if get_setting('telegram_autosubscription'):
        return datetime.datetime.now() + datetime.timedelta(days=int(get_setting('telegram_subscriptiondayscount')))
    else:
        return datetime.datetime.now()

def get_pay_date_end():
    return datetime.datetime.now() + datetime.timedelta(days=int(30))


class User(models.Model):
    """
    Модель пользователей телеграм
    """
    class STATUS:
        OLD = 0
        ACTIVE = 1
        BLOCKED = 2
        RESELLER = 3
        TYPES = (
            (OLD, 'Старый пользователь'),
            (ACTIVE, 'Активный пользователь'),
            (BLOCKED, 'В ожидании оплаты'),
            (RESELLER, 'Перекупщик'),
        )

    telegram_id = models.BigIntegerField(_('Telegram id'), unique=True)
    language_code = models.CharField(_('Language'), max_length=10, blank=True, null=True)
    last_name = models.CharField(_('Last name'), max_length=255, blank=True, null=True)
    first_name = models.CharField(_('First name'), max_length=255, blank=True, null=True)
    username = models.CharField(_('Telegram username'), max_length=255, blank=True, null=True)

    is_manager = models.BooleanField(_('Full access'), default=False)
    is_manager_without_subscription = models.BooleanField(_('Full access without subscription'), default=False)
    is_banned = models.BooleanField(_('Is Banned'), default=False)
    is_parsing = models.BooleanField(_('Disassembled auto'), default=False)
    is_docs = models.BooleanField(_('Candy wrappers'), default=False)
    is_filter_spare = models.BooleanField(_('Filter spare'), default=False)
    is_filter_respair = models.BooleanField(_('Filter respair'), default=False)
    is_filter_transport = models.BooleanField(_('Filter transport'), default=False)

    is_filter_unit = models.BooleanField(_('Filter unit'), default=False)
    is_filter_truck = models.BooleanField(_('Filter truck'), default=False)

    subscription_date_end = models.DateTimeField(_('Subscription date end'), default=get_subscription_date_end)

    date_join = models.DateTimeField(_('Date join'), auto_now_add=True)

    # Seller
    seller_rating = models.PositiveSmallIntegerField(_('Rating'), null=True, blank=True, validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ])
    seller_address = models.CharField(_('Address'), null=True, blank=True, max_length=1000)
    seller_organization = models.CharField(_('Organization'), null=True, blank=True, max_length=100)
    seller_worked = models.CharField(_('With who worked'), null=True, blank=True, max_length=1000)
    seller_comment = models.TextField(_('Comment'), null=True, blank=True)

    # Bots
    is_main_bot = models.BooleanField(_('Main bot user'), default=True)
    is_subscription_bot = models.BooleanField(_('Subscription bot user'), default=False)

    # Subscription
    subscription_all = models.BooleanField(_('Subscription all'), default=False)
    status = models.IntegerField(verbose_name='Статус пользователя', default=STATUS.OLD, choices=STATUS.TYPES)
    pay_date_end = models.DateTimeField(verbose_name='Окончание проплаченного периода', default=get_pay_date_end)
    notification_sended = models.BooleanField('Отправлено уведомление', default=False)


    class Meta:
        db_table = 'telegram_users'
        ordering = ['username']
        verbose_name = _('Telegram user')
        verbose_name_plural = _('Telegram users')

    def __str__(self):
        # if self.username:
        #     return self.username
        s = ''
        if self.last_name:
            if self.first_name:
                s = '%s %s' % (self.first_name, self.last_name)
            else:
                s = '%s' % self.last_name
        else:
            if self.first_name:
                s = '%s' % self.first_name
        # if self.username:
        #     s = '%s @%s' % (s, self.username)
        # if s == '':
        #     if self.name:
        #         s = '%s %s' % (self.name, self.surname)
        return s

    def __usr__(self):
        u = ''
        u = self.username
        return u

    @property
    def fio(self):
        s = '%s %s' % ('' if self.first_name is None else str(self.first_name),
                       '' if self.last_name is None else str(self.last_name), )
        return s.strip()

    @property
    def full_access(self):
        if self.is_manager:
            return True
        if self.is_manager_without_subscription:
            return True
        if datetime.datetime.now() <= self.subscription_date_end:
            return True
        return False

    @property
    def full_access_for_sub(self):
        if self.is_manager:
            return True
        if datetime.datetime.now() <= self.subscription_date_end:
            return True
        return False

    @property
    def filter_spare_access(self):
        if self.is_filter_spare:
            return True
        return False

    def update_payment_period(self, period):
        if self.status == 2:
            self.status = 1
            self.subscription_all = False
            self.pay_date_end = datetime.datetime.now() + datetime.timedelta(days=int(period))
            self.notification_sended = False
            self.save()
        else:
            self.pay_date_end = self.pay_date_end + datetime.timedelta(days=int(period))
            self.notification_sended = False
            self.save()


    def update_payment_period_purchase(self, period):
        if self.status == 2:
            self.status = 3
            self.subscription_all = True
            self.pay_date_end = datetime.datetime.now() + datetime.timedelta(days=int(period))
            self.notification_sended = False
            self.save()
        else:
            self.pay_date_end = self.pay_date_end + datetime.timedelta(days=int(period))
            self.notification_sended = False
            self.save()



class String(CacheModel, models.Model):
    """
    Текстовые сообщения и кнопки. Любые текстовые элементы бота
    """

    name = models.CharField(_('Name'), max_length=255)
    slug = models.SlugField(_('System name'), max_length=100, unique=True)
    category = models.CharField(_('Category'), max_length=255)
    value = models.TextField(_('Value'), max_length=10000, help_text=_('Formatting telegram message'))

    object = models.Manager()

    class Meta:
        db_table = 'telegram_strings'
        ordering = ['category', 'name']
        verbose_name = _('Telegram message/button')
        verbose_name_plural = _('Telegram messages/buttons')

    def __str__(self):
        return '%s' % self.name

    @staticmethod
    def get_string(name):

        try:
            return String.cache.get(slug=name).value
        except String.DoesNotExist:
            return ''

    def print_value(self):
        s = self.value[:SHORT_VALUE_LENGTH-3]
        if len(self.value) > SHORT_VALUE_LENGTH:
            s += '...'
        return s
    print_value.short_description = _('Value')


class Process(models.Model):

    """
    Внутренняя процедура телеграм
    """

    user = models.OneToOneField(User, verbose_name=_('User'), on_delete=models.CASCADE, related_name='process_user')
    module = models.CharField(_('Module'), max_length=255)
    function = models.CharField(_('Function'), max_length=255)

    class Meta:
        db_table = 'telegram_process'
        ordering = ['user__username']
        verbose_name = _('Process')
        verbose_name_plural = _('Process')

    def __str__(self):
        return '%s' % self.user.username


class ProcessAttr(models.Model):

    """
    Аттрибуты внутренних процедур телеграм
    """

    procedure = models.ForeignKey(Process, verbose_name=_('Process'), on_delete=models.CASCADE)
    value = models.TextField(_('Value'), max_length=1000)

    class Meta:
        db_table = 'telegram_process_attrs'
        ordering = ['procedure__id', 'id']
        verbose_name = _('Process attribute')
        verbose_name_plural = _('Process attributes')

    def __str__(self):
        return '%s' % self.value


class Menu(MPTTModel, CacheModel, OrderModel, PublicModel, models.Model):

    """
    Кастомное меню телеграм
    """

    name = models.CharField(_('Name'), max_length=100, unique=True)
    value = models.TextField(_('Value'), help_text=_('Formatting telegram message'))
    parent = TreeForeignKey('self', verbose_name=_('Parent'), null=True, blank=True,on_delete=models.CASCADE)

    objects = models.Manager()

    class Meta:
        db_table = 'telegram_menu'
        ordering = ['tree_id', 'lft']
        verbose_name = _('Menu item')
        verbose_name_plural = _('Menu')

    class MPTTMeta:
        order_insertion_by = ['order']

    def __str__(self):
        return '%s' % self.name


class Chat(models.Model):

    name = models.CharField(_('Name'), max_length=1000)
    telegram_id = models.BigIntegerField(_('Telegram id'), unique=True)
    date_join = models.DateTimeField(_('Date join'), auto_now_add=True)

    username = models.CharField(_('Telegram username'), max_length=255, blank=True, null=True)

    print_requests = models.BooleanField(_('Print requests'), default=False)
    print_parsings = models.BooleanField(_('Print parsings'), default=False)
    print_sales = models.BooleanField(_('Print sales'), default=False)
    print_trucks = models.BooleanField(_('Print trucks'), default=False)
    print_docs = models.BooleanField(_('Print docs'), default=False)

    class Meta:
        db_table = 'telegram_chats'
        ordering = ['date_join']
        verbose_name = _('Telegram chat')
        verbose_name_plural = _('Telegram chats')

    def __str__(self):
        return '%s' % self.name

class Qiwi(models.Model):
    token = models.CharField(verbose_name='Токен киви', max_length=255, blank=True, null=True)
    amount = models.IntegerField(verbose_name='Сумма месячной подписки полная', default=0)
    amount_purchaser = models.IntegerField(verbose_name='Сумма месячной подписки закупщика', default=0)
    secret_key = models.CharField(verbose_name='Секретный ключ', max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Киви '
        verbose_name_plural = 'Киви '
        ordering = ['-id', ]

class SberBank(models.Model):
    name = models.CharField(verbose_name='Тип аккаунта', max_length=255, blank=True, null=True)
    login = models.CharField(verbose_name='Логин', max_length=255, blank=True, null=True)
    password = models.CharField(verbose_name='Пароль', max_length=255, blank=True, null=True)
    order_url = models.CharField(verbose_name='Ссылка заказа', max_length=255, blank=True, null=True)
    amount = models.IntegerField(verbose_name='Сумма месячной подписки полная', default=0)
    amount_purchaser = models.IntegerField(verbose_name='Сумма месячной подписки закупщика', default=0)
    amount_3 = models.IntegerField(verbose_name='Сумма 3-месячной подписки полная', default=0)
    amount_purchaser_3 = models.IntegerField(verbose_name='Сумма 3-месячной подписки закупщика', default=0)
    amount_6 = models.IntegerField(verbose_name='Сумма 6-месячной подписки полная', default=0)
    amount_purchaser_6 = models.IntegerField(verbose_name='Сумма 6-месячной подписки закупщика', default=0)
    amount_12 = models.IntegerField(verbose_name='Сумма годовой подписки полная', default=0)
    amount_purchaser_12 = models.IntegerField(verbose_name='Сумма годовой подписки закупщика', default=0)

    class Meta:
        verbose_name = 'Сбербанк'
        verbose_name_plural = 'Сбербанки'
        ordering = ['-id', ]

    def __str__(self):
        return '%s' % self.name

class Sberbank_Payment(models.Model):
    class TYPE:
        UNDEFINED = 0
        FULL = 1
        PURCHASE = 2
        FULL_THREE = 3
        PURCHASE_THREE = 4
        FULL_SIX = 5
        PURCHASE_SIX = 6
        FULL_YEAR = 7
        PURCHASE_YEAR = 8
        TYPES = (
            (UNDEFINED, 'Неопределен'),
            (FULL, 'Полный доступ на месяц'),
            (PURCHASE, 'Доступ закупщика на месяц'),
            (FULL_THREE, 'Полный доступ 3 месяца'),
            (PURCHASE_THREE, 'Доступ закупщика 3 месяца'),
            (FULL_SIX, 'Полный доступ 6 месяцев'),
            (PURCHASE_SIX, 'Доступ закупщика 6 месяцев'),
            (FULL_YEAR, 'Полный доступ год'),
            (PURCHASE_YEAR, 'Доступ закупщика год'))
    user = models.ForeignKey(User, related_name='sberbank_payment_user', verbose_name=_('User'), on_delete=models.CASCADE,blank=True, null=True)
    telegram_user_id = models.CharField(verbose_name='Id пользователя', max_length=255, blank=True, null=True)
    order_id = models.CharField(verbose_name='Id платежа', max_length=255, blank=True, null=True)
    order_number =  models.IntegerField(verbose_name='Номер платежа', default=0)
    status = models.BooleanField(default=False, verbose_name='Оплачено')
    price = models.IntegerField(verbose_name='Сумма платежа', default=0)
    link = models.CharField(verbose_name='Ссылка платежа', max_length=1024, blank=True, null=True)
    type = models.IntegerField(verbose_name='Тип', default=TYPE.UNDEFINED, choices=TYPE.TYPES)
    create_at = models.DateTimeField(verbose_name='Создано', auto_now_add=True)
    update_at = models.DateTimeField(verbose_name='Обновлено', auto_now=True)

    class Meta:
        verbose_name = 'Сбербанк платеж'
        verbose_name_plural = 'Сбербанк платежи'
        ordering = ['create_at', ]

    def __str__(self):
        return 'Платеж ' + '%s' % self.user + " {0}".format(self.id)

class Qiwi_Payment(models.Model):
    class TYPE:
        UNDEFINED = 0
        FULL = 1
        PURCHASE = 2
        TYPES = (
            (UNDEFINED, 'Неопределен'),
            (FULL, 'Полный доступ'),
            (PURCHASE, 'Доступ закупщика'))
    user = models.ForeignKey(User, related_name='qiwi_payment_user', verbose_name=_('User'), on_delete=models.CASCADE,blank=True, null=True)
    telegram_user_id = models.CharField(verbose_name='Id пользователя', max_length=255, blank=True, null=True)
    bill_id = models.IntegerField(verbose_name='Id платежа', default=0)
    comment =  models.CharField(verbose_name='Комментарий платежа', max_length=255, blank=True, null=True)
    status = models.BooleanField(default=False, verbose_name='Оплачено')
    price = models.IntegerField(verbose_name='Сумма платежа', default=0)
    link = models.CharField(verbose_name='Ссылка платежа', max_length=1024, blank=True, null=True)
    type = models.IntegerField(verbose_name='Тип', default=TYPE.UNDEFINED, choices=TYPE.TYPES)
    create_at = models.DateTimeField(verbose_name='Создано', auto_now_add=True)
    update_at = models.DateTimeField(verbose_name='Обновлено', auto_now=True)

    class Meta:
        verbose_name = 'Киви платеж'
        verbose_name_plural = 'Киви платежи'
        ordering = ['create_at', ]

    def __str__(self):
        return 'Платеж ' + '%s' % self.user + " {0}".format(self.id)


class Image(models.Model):

    user = models.ForeignKey(User, verbose_name=_('User'), on_delete=models.CASCADE)
    file_id = models.CharField(_('File id'), max_length=250)

    class Meta:
        db_table = 'telegram_images'
        ordering = ['id']
        verbose_name = _('Telegram image')
        verbose_name_plural = _('Telegram images')

    def __str__(self):
        return '%s' % self.file_id

class SendMessage(models.Model):
    message = models.CharField(_('Message'), max_length=10000)
    file = models.FileField(_('File'), upload_to='new/sendmessage/%Y/%m/%d/')

    class Meta:
        db_table = 'telegram_send_message'
        ordering = ['id']
        verbose_name = _('Telegram send message')
        verbose_name_plural = _('Telegram send messages')

    def __str__(self):
        return '%s' % self.message

class SendIds(models.Model):
    tg_id = models.BigIntegerField(verbose_name='Тип', default=0)

    class Meta:
        db_table = 'telegram_send_message_id'
        ordering = ['id']
        verbose_name = _('Telegram send message id')
        verbose_name_plural = _('Telegram send message ids')

    def __str__(self):
        return '%s' % self.tg_id

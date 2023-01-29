from django.utils import timezone


class ImageTools:
    def get_image_path_by_date(self, instance, filename):
        path = timezone.now().strftime(f"{instance._meta.app_label}/{instance.__class__.__name__}/%Y/%m/%d/{instance.__str__()}/{filename}")
        return path


